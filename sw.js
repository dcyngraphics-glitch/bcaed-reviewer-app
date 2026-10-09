/*
 * Offline support.
 *
 * The plan asks for previously loaded lessons and practice questions to stay
 * available offline, with activity saved locally and synced when the
 * connection returns. Progress is already stored in localStorage, so the only
 * thing missing offline is the app shell and the content bundle — which is what
 * this worker caches.
 *
 * Strategy:
 *  - Navigation requests: network first, falling back to the cached shell, so a
 *    deploy is picked up immediately but an offline reload still works.
 *  - Built assets (hashed filenames): cache first, since a new build produces a
 *    new filename.
 *  - Everything else on the same origin: stale-while-revalidate.
 */

const CACHE = 'bcaed-v1';

/** The shell plus the icons; content is bundled into the JS, not separate files. */
const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png',
  '/favicon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      // Individually, so one 404 does not abort the whole install.
      .then((cache) =>
        Promise.all(
          PRECACHE.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => undefined),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only same-origin GETs; never touch POSTs or third-party requests.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put('/index.html', copy));
          return response;
        })
        .catch(() => caches.match('/index.html').then((cached) => cached ?? Response.error())),
    );
    return;
  }

  // Hashed build assets never change under the same URL.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((response) => {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
            return response;
          }),
      ),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached ?? Response.error());

      return cached ?? network;
    }),
  );
});
