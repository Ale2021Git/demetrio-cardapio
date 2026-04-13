const CACHE_NAME = 'demetrio-v5'; // Mudei para v3 aqui!

const assets = [
    './',
    './index.html',
    './manifest.json',
    './assets/churrasco.png',
    './assets/carne-assada.png',
    './assets/carne-ensopada.png',
    './assets/carre.png',
    './assets/dobradinha.png',
    './assets/frango-assado.png',
    './assets/frango-grelhado.png',
    './assets/frango-milanesa.png',
    './assets/strogonoff.png',
    './assets/lingua.png',
    './assets/linguica.png',
    './assets/coca.png',
    './assets/guarana.png',
    './assets/guaravita.png',
    './assets/fundo-xadrez.webp',
    './assets/utensilios-de-cozinha.png'
];

// Instalação e Cache
self.addEventListener('install', event => {
    self.skipWaiting(); // Força o novo SW a assumir o controle imediatamente
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
    );
});

// Limpeza de cache antigo
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache); // Apaga o v1 antigo
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(res => res || fetch(event.request))
    );
});

