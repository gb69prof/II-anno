from pathlib import Path
import json,hashlib
root=Path(__file__).resolve().parent.parent
files=sorted(p.relative_to(root).as_posix() for p in root.rglob('*') if p.is_file() and p.name not in ['sw.js','README.md'] and not {'tests','tools'}.intersection(p.relative_to(root).parts))
version=hashlib.sha256(b''.join((root/f).read_bytes() for f in files)).hexdigest()[:12]
script='''// Storia only. Notes live in localStorage and are never touched here.
const BASE=new URL('./',self.location.href);
const PREFIX='gbprof-storia:'+BASE.pathname+':';
const CACHE=PREFIX+'VERSION';
const FILES=FILES_LIST;
let preparation;
function prepare(){return preparation??=(async()=>{
 const cache=await caches.open(CACHE);
 // Cache each response, then publish readiness only when every file is present.
 for(const file of FILES){const url=new URL(file,BASE);const response=await fetch(new Request(url,{cache:'reload'}));if(!response.ok)throw Error('Missing '+file);await cache.put(url,response)}
 await cache.put(new URL('offline-ready.json',BASE),new Response(JSON.stringify({version:CACHE}),{headers:{'Content-Type':'application/json'}}));
})().finally(()=>{preparation=null})}
self.addEventListener('install',event=>event.waitUntil(prepare()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);
 await self.clients.claim();for(const client of await self.clients.matchAll())client.postMessage({type:'READY'});
})()));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE')self.skipWaiting();if(event.data?.type==='STATUS')event.waitUntil((async()=>{const cache=await caches.open(CACHE);if(!await cache.match(new URL('offline-ready.json',BASE)))await prepare();event.source?.postMessage({type:'READY'})})().catch(()=>event.source?.postMessage({type:'OFFLINE_INCOMPLETE'})))});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;const url=new URL(event.request.url);
 if(url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE),key=new URL(url);key.search='';key.hash='';if(key.pathname.endsWith('/'))key.pathname+='index.html';const saved=await cache.match(key);if(saved)return saved;
 try{return await fetch(event.request)}catch{return new Response('Risorsa non disponibile offline. Torna all’indice di Storia o ristabilisci la connessione.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}})}
 })());
});
'''.replace('VERSION',version).replace('FILES_LIST',json.dumps(files,ensure_ascii=False))
(root/'sw.js').write_text(script,encoding='utf-8')
print('Cache',version,len(files),'resources')
