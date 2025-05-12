const staticCacheName = 'static-v1';
const dynamicCacheName = 'dynamic-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/assets/icons/notepad-16x16.png',
  '/assets/icons/notepad-512x512.png',
].map(url => '/RS_MF_m4_task'.concat(url));

self.addEventListener('install', async () => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(ASSETS);
});

self.addEventListener('activate', async () => {
  const keys = await caches.keys();
  await Promise.all(
    keys
      .filter(key => key !== staticCacheName && key !== dynamicCacheName)
      .map(key => caches.delete(key))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(cacheFirst(e.request));
});

const cacheFirst = async request => {
  const cached = await caches.match(request);

  try {
    return (
      cached ??
      (await fetch(request).then(() => {
        return networkFirst(request);
      }))
    );
  } catch (e) {
    return networkFirst(request);
  }
};

const networkFirst = async request => {
  const cache = await caches.open(dynamicCacheName);

  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    return cached ?? (await caches.match('/'));
  }
};
