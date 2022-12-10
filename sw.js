const staticCahce = 'Static-cache-v1';
const dynamicCache = 'Dynamic-cache-v1';

const assets = [
    "/",
    "index.html",
    "css\index.css",
    "css\materialize.css",
    "css\materialize.min.css",
    "js\app.js",
    "js\materialize.js",
    "js\materialize.min.js",
    "js\fallback.html"
]

const limitCacheSize = (name, size) => {
caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
        if(keys.length > size) {
            cache.delete(keys[0]).then(limitCacheSize(name, size))
        }
    })
})

}
self.addEventListener("install", function (event) {
    console.log('SW: Event fired: ${event.type}');
    event.waitUntil(caches.open("static").then(function (cache) {
        console.log("Precaching App shell");
        cache.addAll(assets);
    }));
});
self.addEventListener("activate", function (event) {
    event.waitUntil(caches.keys().then((keys) => {
        return Promise.all (keys.filter((key) => key !== staticCache).map((key) => caches.delete())
    );
    })
    );
});
self.addEventListener("fetch", function (event) {
    console.log('SW: Event fired: ${event.request.url}');
    event.respondWith(fetch(event.request));
    caches.match(event.request).then((response) =>  {
        return response || fetch(event.request).then(fetchRes => {
            return caches.open(dynamicCache).then(cache => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(dynamicCache, 3);
                return fetchRes;
            });
        });
    });
});