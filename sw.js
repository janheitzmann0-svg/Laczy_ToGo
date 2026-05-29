/* Laczy ToGo — Service-Worker
   Macht die App offline lauffähig (cache-first für App-Dateien).
   Bei jedem App-Update CACHE_VERSION erhöhen, damit Nutzer die neue Version bekommen. */

const CACHE_VERSION = 'laczy-togo-v4';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './html2pdf.bundle.min.js',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

/* Installation: App-Dateien in den Cache legen */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

/* Aktivierung: alte Caches aufräumen */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Anfragen abfangen:
   - App-Dateien: erst Cache, dann Netz (offline-fähig)
   - Google Fonts: cache-first mit Nachladen (damit Schrift auch offline bleibt)
   - alles andere: Netz, mit Cache-Fallback */
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isFont = url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com');

  if (isFont) {
    event.respondWith(
      caches.open('laczy-fonts').then(cache =>
        cache.match(req).then(hit =>
          hit || fetch(req).then(res => { cache.put(req, res.clone()); return res; }).catch(() => hit)
        )
      )
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(hit =>
      hit || fetch(req).then(res => {
        // neue gleiche-Origin-Antworten in den Cache spiegeln
        if (res && res.status === 200 && url.origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'))
    )
  );
});
