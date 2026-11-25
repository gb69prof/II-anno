"""Registro privato di Poesia. Il file Excel cifrato è l'unica copia persistente delle prove."""
import collections
import contextlib
import datetime
import fcntl
import hmac
import io
import json
import os
from pathlib import Path
import tempfile
import threading
import time
import unicodedata
import uuid
from urllib.parse import parse_qs
from zoneinfo import ZoneInfo

import msoffcrypto
from msoffcrypto.format.ooxml import OOXMLFile
from openpyxl import Workbook, load_workbook
from openpyxl.styles import Font, PatternFill
from openpyxl.utils import get_column_letter

DATA = Path(os.environ.get('POESIA_DATA','/registro'))
FILE = DATA/'Registro-Poesia.xlsx'
PASSWORD = (DATA/'.password').read_text().rstrip('\r\n')
if not PASSWORD:
    raise RuntimeError('Password del registro mancante')
BANK = json.loads(Path(__file__).with_name('banca.json').read_text())
assert len(BANK) == 20 and all(len(q['choices'])==3 and len(set(map(len,q['choices'])))==1 for q in BANK)
ROOT = '/II-anno/Poesia/test/api/'
MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
recent = {}
guard = threading.Lock()

def allowed(address, route, limit):
    now = time.monotonic()
    with guard:
        for key in list(recent):
            if recent[key][-1] < now-60:
                del recent[key]
        bucket = recent.setdefault((address,route),collections.deque())
        while bucket and bucket[0] < now-60:
            bucket.popleft()
        if len(bucket)>=limit:
            return False
        bucket.append(now)
        return True

@contextlib.contextmanager
def locked():
    with (DATA/'.lock').open('ab') as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        yield

def blank():
    w=Workbook()
    sheet=w.active
    sheet.title='Prove'
    sheet.append(['ID prova','Data e ora (Roma)','Nome','Cognome','Esatte su 20','Voto /10','Giudizio'])
    details=w.create_sheet('Risposte')
    details.append(['ID prova','Domanda n.','Argomento','Quesito','Risposta data','Risposta esatta','Esito','Recupero per errore','Esercizio di recupero'])
    for ws,widths in [(sheet,[38,24,24,24,15,14,90]),(details,[38,13,25,85,53,53,14,95,85])]:
        ws.freeze_panes='C2'
        for i,width in enumerate(widths,1):
            ws.column_dimensions[get_column_letter(i)].width=width
        for cell in ws[1]:
            cell.font=Font(color='FFFFFF',bold=True)
            cell.fill=PatternFill('solid',fgColor='26435C')
    return w

def save(w):
    for sheet in w:
        sheet.auto_filter.ref=sheet.dimensions
    plain=io.BytesIO()
    w.save(plain)
    plain.seek(0)
    tmp=None
    try:
        with tempfile.NamedTemporaryFile(dir=DATA,prefix='.registro-',delete=False) as f:
            tmp=f.name
            OOXMLFile(plain).encrypt(PASSWORD,f)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp,FILE)
        fd=os.open(DATA,os.O_RDONLY)
        try: os.fsync(fd)
        finally: os.close(fd)
    finally:
        if tmp: Path(tmp).unlink(missing_ok=True)

def load():
    with FILE.open('rb') as f:
        obj=msoffcrypto.OfficeFile(f)
        obj.load_key(password=PASSWORD,verify_password=True)
        plain=io.BytesIO()
        obj.decrypt(plain,verify_integrity=True)
    plain.seek(0)
    return load_workbook(plain)

with locked():
    if not FILE.exists():
        save(blank())
    else:
        load().close()

def clean_name(text):
    if not isinstance(text,str): raise ValueError()
    value=unicodedata.normalize('NFC',text.strip())
    if not 1<=len(value)<=60 or any(unicodedata.category(c)[0]=='C' for c in value):
        raise ValueError()
    return value

def assess(answers):
    wrong=[]
    for q,index in zip(BANK,answers):
        if index!=q['key']:
            wrong.append(dict(numero=q['id'],domanda=q['prompt'],scelta=q['choices'][index],esatta=q['choices'][q['key']],lezione=q['recovery'],esercizio=q['practice'],tema=q['topic']))
    n=20-len(wrong)
    if n==20: judgment='Prova completa. Hai riconosciuto le forme e seguito con precisione il passaggio dalla percezione all’immaginazione nei versi di Leopardi.'
    elif n>=17: judgment='Comprensione solida del percorso. Per rendere più precisa la lettura, riprendi gli esempi relativi a '
    elif n>=14: judgment='Hai riconosciuto buona parte dei concetti. Per consolidare i collegamenti fra definizione ed esempio, torna su '
    elif n>=12: judgment='Hai raggiunto i saperi di base. Per acquisire maggiore sicurezza, confronta le tue risposte con i versi e con le tavole su '
    else: judgment='La prova richiede un recupero guidato. Riparti dalle definizioni e applicale a un esempio alla volta, cominciando da '
    if wrong:
        topics=collections.Counter(e['tema'] for e in wrong)
        judgment+=', '.join(t.lower() for t,_ in topics.most_common(3))+'.'
    return dict(registrata=True,voto=n/2,corrette=n,giudizio=judgment,errori=wrong)

def append(ws,row):
    ws.append(row)
    for cell in ws[ws.max_row]:
        if isinstance(cell.value,str): cell.data_type='s'

class AlreadyUsed(Exception): pass

def record(data):
    if not isinstance(data,dict) or data.get('versione')!=1: raise ValueError()
    attempt=str(uuid.UUID(data['attempt']))
    first,last=clean_name(data['nome']),clean_name(data['cognome'])
    a=data['risposte']
    if not isinstance(a,list) or len(a)!=20 or any(type(i) is not int or not 0<=i<=2 for i in a):raise ValueError()
    report=assess(a)
    with locked():
        w=load()
        try:
            for row in w['Prove'].values:
                if row[0]==attempt:
                    stored=[x[4] for x in w['Risposte'].values if x[0]==attempt]
                    if row[2:4]!=(first,last) or stored!=[q['choices'][i] for q,i in zip(BANK,a)]:raise AlreadyUsed()
                    return report
            now=datetime.datetime.now(ZoneInfo('Europe/Rome')).isoformat(timespec='seconds')
            append(w['Prove'],[attempt,now,first,last,report['corrette'],report['voto'],report['giudizio']])
            for q,i in zip(BANK,a):
                ok=i==q['key']
                append(w['Risposte'],[attempt,q['id'],q['topic'],q['prompt'],q['choices'][i],q['choices'][q['key']],'Esatta' if ok else 'Errata',None if ok else q['recovery'],None if ok else q['practice']])
            save(w)
        finally:w.close()
    return report

def application(env,start):
    def reply(status,data,typ='application/json; charset=utf-8',extra=()):
        b=data if isinstance(data,bytes) else json.dumps(data,ensure_ascii=False).encode()
        start(status,[('Content-Type',typ),('Content-Length',str(len(b))),('Cache-Control','no-store'),('X-Content-Type-Options','nosniff'),*extra])
        return [b]
    path=env.get('PATH_INFO','')
    method=env['REQUEST_METHOD']
    if path==ROOT+'stato' and method=='GET':return reply('200 OK',{'pronto':FILE.is_file()})
    if path not in (ROOT+'prove',ROOT+'registro'):return reply('404 Not Found',{})
    if method!='POST':return reply('405 Method Not Allowed',{},extra=[('Allow','POST')])
    if env.get('HTTP_ORIGIN') not in (None,'https://gbprof.it','https://www.gbprof.it') or env.get('HTTP_SEC_FETCH_SITE')=='cross-site':
        return reply('403 Forbidden',{})
    teacher=path.endswith('/registro')
    addr=env.get('HTTP_X_FORWARDED_FOR','').split(',')[-1].strip() or env.get('REMOTE_ADDR','')
    if not allowed(addr,path,8 if teacher else 180):return reply('429 Too Many Requests',{},extra=[('Retry-After','60')])
    try:
        length=int(env.get('CONTENT_LENGTH') or '0')
        if not 0<length<=8192:return reply('413 Content Too Large',{})
        form_type=env.get('CONTENT_TYPE','').split(';')[0]
        if form_type!=('application/x-www-form-urlencoded' if teacher else 'application/json'):
            return reply('415 Unsupported Media Type',{})
        body=env['wsgi.input'].read(length).decode('utf-8')
        if teacher:
            given=parse_qs(body,max_num_fields=2).get('password',[''])[0].encode()
            if not hmac.compare_digest(given,PASSWORD.encode()):return reply('403 Forbidden',{})
            return reply('200 OK',FILE.read_bytes(),MIME,[('Content-Disposition','attachment; filename="Registro-Poesia.xlsx"')])
        return reply('200 OK',record(json.loads(body)))
    except AlreadyUsed:return reply('409 Conflict',{})
    except (ValueError,KeyError,TypeError,AttributeError):return reply('422 Unprocessable Content',{})
    except Exception:
        return reply('503 Service Unavailable',{'registrata':False})
