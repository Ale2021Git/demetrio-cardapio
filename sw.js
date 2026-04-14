const CACHE_NAME = 'demetrio-v6'; // Mudei para v2 aqui!

const assets = [
    './',
    './index.html',
    './manifest.json',
    './assets/churrasco.webp',
    './assets/carne-assada.webp',
    './assets/carne-ensopada.webp',
    './assets/carre.webp',
    './assets/dobradinha.webp',
    './assets/frango-assado.webp',
    './assets/frango-grelhado.webp',
    './assets/frango-milanesa.webp',
    './assets/strogonoff.webp',
    './assets/lingua.webp',
    './assets/linguica.webp',
    './assets/coca.webp',
    './assets/guarana.webp',
    './assets/guaravita.webp',
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

