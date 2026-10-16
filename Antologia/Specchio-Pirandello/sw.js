/* Installazione autonoma: non cancella le cache delle altre PWA gbprof. */
const BASE=new URL("./",self.location.href);
const PREFIX="gbprof-specchio-pirandello:"+BASE.pathname+":";
const CACHE=PREFIX+"v1";
const CORE=["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./icon.svg"].map(function(p){return new URL(p,BASE).href;});
self.addEventListener("install",function(event){
  event.waitUntil(caches.open(CACHE).then(function(cache){return cache.addAll(CORE);}).then(function(){return self.skipWaiting();}));
});
self.addEventListener("activate",function(event){
  event.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k.startsWith(PREFIX)&&k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));
});
self.addEventListener("fetch",function(event){
  const request=event.request,url=new URL(request.url);
  if(request.method!=="GET"||url.origin!==self.location.origin||!url.pathname.startsWith(BASE.pathname))return;
  if(request.mode==="navigate"){
    event.respondWith(fetch(request).then(function(response){
      if(response.ok){const copy=response.clone();caches.open(CACHE).then(function(cache){return cache.put(request,copy);});}
      return response;
    }).catch(function(){return caches.match(request).then(function(match){return match||caches.match(new URL("index.html",BASE).href);});}));
    return;
  }
  event.respondWith(caches.match(request).then(function(cached){
    return cached||fetch(request).then(function(response){
      if(response.ok){const copy=response.clone();caches.open(CACHE).then(function(cache){return cache.put(request,copy);});}
      return response;
    });
  }));
});