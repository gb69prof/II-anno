// Transition worker at the ORIGINAL URL: old installations update this file.
// No cache or localStorage is deleted: other PWAs share this origin.
const BASE = new URL('./', self.location.href);
const LEGACY_FILES = new Set(['manifest.webmanifest', 'privacy.html', 'accessibilita.html']);
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  // Never force navigation: activation may coincide with a click on a subject.
  // The former worker already used network-first for page navigations, so the
  // next online visit/reload shows the new index even before this update.
  event.waitUntil(self.clients.claim());
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
