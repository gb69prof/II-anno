// Storia only. Notes live in localStorage and are never touched here.
const BASE=new URL('./',self.location.href);
const PREFIX='gbprof-storia:'+BASE.pathname+':';
const CACHE=PREFIX+'aee51b89b93f';
const FILES=["assets/css/style.css", "assets/data/catalog.json", "assets/data/quizzes.json", "assets/illustrations/cesare-e-augusto-mappa.svg", "assets/illustrations/cesare-e-augusto.svg", "assets/illustrations/da-costantino-a-carlo-magno-mappa.svg", "assets/illustrations/da-costantino-a-carlo-magno.svg", "assets/illustrations/diocleziano-e-costantino-mappa.svg", "assets/illustrations/diocleziano-e-costantino.svg", "assets/illustrations/il-potere-e-il-sangue-mappa.svg", "assets/illustrations/il-potere-e-il-sangue.svg", "assets/illustrations/roma-potere-esercito-crisi-mappa.svg", "assets/illustrations/roma-potere-esercito-crisi.svg", "assets/js/app.js", "assets/js/core.js", "assets/js/quiz.js", "assets/js/study.js", "cesare-e-augusto/index.html", "da-costantino-a-carlo-magno/index.html", "diocleziano-e-costantino/index.html", "fonti/1-Cesare_e_Augusto_dispensa_didattica_gbprof_Libera.docx", "fonti/2-Il_potere_e_il_sangue_Dispensa_didattica_gbprof_Libera.docx", "fonti/3-Dispensa_didattica_Roma_dai_Flavi_a_Diocleziano_gbprof_Libera.docx", "fonti/4-Dispensa_Diocleziano_Costantino_gbprof_Libera.docx", "fonti/5-Dalla_caduta_di_Roma_all_Impero_carolingio_RACCONTO_STORICO 2.docx", "fonti/inventario.json", "icons/icon-192.png", "icons/icon-512.png", "il-potere-e-il-sangue/index.html", "index.html", "manifest.webmanifest", "roma-potere-esercito-crisi/index.html"];
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
