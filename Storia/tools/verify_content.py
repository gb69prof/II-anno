"""Standard-library audit: original DOCX text, HTML blocks, tables and quizzes."""
from pathlib import Path
from html.parser import HTMLParser
import json, zipfile, xml.etree.ElementTree as ET, re, hashlib

ROOT = Path(__file__).resolve().parent.parent
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocks = {}
        self.current = None
        self.depth = 0
        self.tables = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'data-source' in attrs:
            assert self.current is None
            self.current = attrs['data-source']
            assert self.current not in self.blocks
            self.blocks[self.current] = ''
            self.depth = 0
        if self.current:
            if tag not in ['br', 'img', 'hr', 'input', 'meta', 'link']:
                self.depth += 1
            if tag == 'table': self.tables += 1
    def handle_endtag(self, tag):
        if self.current:
            self.depth -= 1
            if self.depth == 0: self.current = None
    def handle_data(self, data):
        if self.current: self.blocks[self.current] += data

def normalized(s): return re.sub(r'\s+', '', s)
inventory = json.loads((ROOT/'fonti/inventario.json').read_text(encoding='utf-8'))
quizzes = json.loads((ROOT/'assets/data/quizzes.json').read_text(encoding='utf-8'))
total = tables = 0
for lesson in inventory:
    original = ROOT/'fonti'/lesson['filename']
    assert hashlib.sha256(original.read_bytes()).hexdigest() == lesson['sha256']
    with zipfile.ZipFile(original) as z:
        body = ET.fromstring(z.read('word/document.xml')).find(W+'body')
    expected = {}
    # IDs correspond to the XML body index, including empty paragraphs.
    for i, element in enumerate(body):
        if element.tag not in [W+'p', W+'tbl']: continue
        text = ''.join(n.text or '' for n in element.iter(W+'t'))
        if not text.strip(): continue
        expected[f'b{i:04}'] = text
    page = Page()
    page.feed((ROOT/lesson['slug']/'index.html').read_text(encoding='utf-8'))
    assert set(expected) == set(page.blocks), lesson['slug']
    for key, text in expected.items():
        assert normalized(text) == normalized(page.blocks[key]), (lesson['slug'], key)
    assert page.tables == lesson['tables']
    for kind in ['C', 'N']:
        qs = [q for q in quizzes if q['lesson'] == lesson['slug'] and q['kind'] == kind]
        assert len(qs) == 10
        for q in qs:
            assert q['source'] in expected
            assert len(q['options']) == len({o['id'] for o in q['options']}) == 4
            assert len({o['text'] for o in q['options']}) == 4
            assert q['correct'] in {o['id'] for o in q['options']}
    total += len(expected)
    tables += page.tables
    print(lesson['slug'], len(expected), 'blocks;', page.tables, 'tables; 20 questions')
assert len(quizzes) == 100
print('PASS:', total, 'original blocks;', tables, 'tables; 100 questions')
