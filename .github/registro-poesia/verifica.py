"""Verifica su una directory temporanea, senza alcun dato di classe."""
import concurrent.futures
import io
import json
import os
import secrets
import tempfile
import uuid
from pathlib import Path
from urllib.parse import urlencode

with tempfile.TemporaryDirectory() as directory:
    os.environ['POESIA_DATA']=directory
    (Path(directory)/'.password').write_text(secrets.token_urlsafe(24))
    import app
    import msoffcrypto
    def request(route, obj, teacher=False):
        raw=(urlencode(obj) if teacher else json.dumps(obj)).encode()
        env={'PATH_INFO':app.ROOT+route,'REQUEST_METHOD':'POST','CONTENT_LENGTH':str(len(raw)),
             'CONTENT_TYPE':'application/x-www-form-urlencoded' if teacher else 'application/json',
             'wsgi.input':io.BytesIO(raw)}
        status=[]
        result=b''.join(app.application(env,lambda code,headers:status.append(int(code[:3]))))
        return status[0],result
    bank=app.BANK
    public=json.loads((Path(__file__).resolve().parents[2]/'Poesia/test/domande.json').read_text())
    assert public==[{k:q[k] for k in ('id','prompt','choices')} for q in bank]
    assert all(len(set(q['choices']))==3 and len(set(map(len,q['choices'])))==1 for q in bank)
    answers=[q['key'] for q in bank]
    a=dict(attempt=str(uuid.uuid4()),nome='Prova',cognome='=Esempio',risposte=answers,versione=1)
    b=dict(a,attempt=str(uuid.uuid4()),risposte=[(v+1)%3 if i%2 else v for i,v in enumerate(answers)])
    with concurrent.futures.ThreadPoolExecutor(3) as pool:
        replies=list(pool.map(lambda d:request('prove',d),[a,b,a]))
    assert all(status==200 for status,_ in replies)
    assert json.loads(replies[0][1])['voto']==10
    assert json.loads(replies[1][1])['voto']==5 and len(json.loads(replies[1][1])['errori'])==10
    assert request('prove',dict(a,nome='Altra'))[0]==409
    assert request('prove',dict(a,risposte=[True]*20))[0]==422
    assert request('registro',dict(password='errata'),True)[0]==403
    status,encrypted=request('registro',dict(password=app.PASSWORD),True)
    assert status==200
    office=msoffcrypto.OfficeFile(io.BytesIO(encrypted))
    try:office.load_key(password='errata',verify_password=True)
    except msoffcrypto.exceptions.InvalidKeyError:pass
    else:raise AssertionError('Apertura senza password valida')
    book=app.load()
    assert book['Prove'].max_row==3 and book['Risposte'].max_row==41
    assert book['Prove']['D2'].data_type=='s'
    assert book['Prove']['D3'].data_type=='s'
    book.close()
print('Verifiche del registro superate')
