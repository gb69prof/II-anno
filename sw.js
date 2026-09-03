const CACHE_PREFIX = 'antologia-domande-';
const CACHE = `${CACHE_PREFIX}v7`;
const APP_BASE = new URL('./', self.location.href);
const FALLBACK = new URL('index.html', APP_BASE).href;
const CORE = [
  '', 'index.html', 'privacy.html', 'accessibilita.html', 'manifest.webmanifest',
  'pwa-common/gbprof-accessibility.css', 'pwa-common/gbprof-accessibility.js',
  'assets/css/app.css', 'assets/js/app.js', 'assets/js/work-view.js', 'assets/js/form-lab-view.js', 'assets/js/author-view.js', 'assets/js/prevert-view.js',
  'content/percorso.js', 'content/laboratorio-forma.js', 'content/autori/leopardi-infinito.js', 'content/autori/pirandello.js', 'content/autori/prevert-ragazzi.js',
  'assets/maps/prevert-ragazzi-percorso.svg',
  'assets/maps/pirandello-mondo.svg', 'assets/maps/pirandello-fratture.svg', 'assets/maps/pirandello-mondo-nuovo.svg',
  'assets/maps/pirandello-poetica.svg', 'assets/maps/pirandello-opere.svg', 'assets/maps/pirandello-conclusione.svg',
  'assets/copertina-antologia-domande.png',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'
].map(path => new URL(path, APP_BASE).href);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then(cached => cached || caches.match(FALLBACK))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
    }
    return response;
  })));
});
