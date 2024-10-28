const CACHE_NAME = '0+X_WeatherApp';
const staticPaths = [
  '/',
  'favicon.ico',
  'manifest.json',
  'icons/weather-icon-144.png',
];
const files = self.__WB_MANIFEST.map((file) => {
  if (typeof file === 'string') return file;

  return file.url;
}).concat(...staticPaths);

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    return cache.addAll(files).then(() => self.skipWaiting());
  }));
});

self.addEventListener('fetch', (event) => {
  if (navigator.onLine) {
    const reqCopy = event.request.clone();

    return fetch(reqCopy).then((response) => {
      if (!response || !response.ok) {
        return response;
      }

      const responseToCache = response.clone();
      const url = new URL(event.request.url).pathname;

      if (files.includes(url)) {
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
      }

      return response;
    });
  }

  return event.respondWith(caches.match(event.request).then((response) => response));
});
