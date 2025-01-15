// service-worker.js
self.addEventListener('install', function(event) {
    console.log('Service Worker instalando.');
    // Armazene arquivos importantes no cache para acesso offline
    event.waitUntil(
        caches.open('meu-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                '/icon.png'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('Buscando:', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', function(event) {
    const options = {
        body: event.data.text(),
        icon: '/icon.png',
        badge: '/badge.png'
    };

    event.waitUntil(
        self.registration.showNotification('Notificação Push', options)
    );
});
