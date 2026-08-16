const CACHE = 'antologia-domande-v4';
const APP_BASE = new URL('./', self.location.href);
const FALLBACK = new URL('index.html', APP_BASE).href;
const CORE = [
  '', 'index.html', 'manifest.webmanifest',
  'assets/css/app.css', 'assets/js/app.js', 'assets/js/work-view.js', 'assets/js/form-lab-view.js',
  'content/percorso.js', 'content/laboratorio-forma.js', 'content/autori/leopardi-infinito.js',
  'assets/copertina-antologia-domande.png',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'
].map(path => new URL(path, APP_BASE).href);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(FALLBACK, copy)); return response;
    }).catch(() => caches.match(FALLBACK)));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); }
    return response;
  })));
});
