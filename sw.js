// sw.js — no-cache, auto-unregister
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    // 1) cancella tutte le cache esistenti
    const names = await caches.keys();
    await Promise.all(names.map((n) => caches.delete(n)));

    // 2) deregistra il service worker
    await self.registration.unregister();

    // 3) ricarica subito le pagine aperte
    const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    clientsList.forEach((c) => c.navigate(c.url));
  })());
});

// 4) niente caching, tutto va diretto alla rete
self.addEventListener('fetch', () => {});
