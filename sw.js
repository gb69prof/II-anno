// Transition worker at the ORIGINAL URL: old installations update this file.
// No cache or localStorage is deleted: other PWAs share this origin.
const BASE = new URL('./', self.location.href);
const LEGACY_FILES = new Set(['manifest.webmanifest', 'privacy.html', 'accessibilita.html']);
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await self.clients.claim();
    const windows = await self.clients.matchAll({type: 'window'});
    for (const client of windows) {
      const url = new URL(client.url);
      // Refresh only the old app's entry point, never other subjects or PWAs.
      if (url.origin === BASE.origin &&
          (url.pathname === BASE.pathname || url.pathname === BASE.pathname + 'index.html')) {
        // Do not await navigation inside activate: it can wait for activation
        // itself and deadlock the first visit after the update.
        void client.navigate(client.url).catch(() => {});
      }
    }
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== BASE.origin || !url.pathname.startsWith(BASE.pathname)) return;
  const path = url.pathname.slice(BASE.pathname.length);
  if (LEGACY_FILES.has(path) || /^(assets|content|icons|pwa-common)\//.test(path)) {
    // Requests from an old tab or bookmark continue at their relocated URL.
    event.respondWith(Response.redirect(new URL('Antologia/' + path + url.search, BASE).href, 302));
  }
  // All other requests use the network normally, without the old root cache.
});
