const CACHE_NAME = 'demetrio-v1';
const assets = [
    './',
    './index.html',
    './manifest.json',
    './assets/utensilios-de-cozinha.png',
    './assets/fundo-xadrez.png'
];

// Instalação e Cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache aberto');
            return cache.addAll(assets);
        })
    );
});

// Responde offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

