const CACHE_NAME = 'demetrio-v7'; // Incrementado para forçar atualização

const assets = [
    './',
    './index.html',
    './manifest.json',
    './assets/utensilios-de-cozinha.png', // Ícone principal
    './assets/fundo-xadrez.webp',
    './assets/fundo-churrasco.webp',
    './assets/carne-ensopada.webp',
    './assets/frango-grelhado.webp',
    './assets/lingua.webp',
    './assets/frango-milanesa.webp',
    './assets/linguica.webp',
    './assets/strogonoff.webp',
    './assets/carne-assada.webp',
    './assets/frango-assado.webp',
    './assets/dobradinha.webp',
    './assets/carre.webp',
    './assets/churrasco.webp',
    './assets/coca.webp',
    './assets/guarana.webp',
    './assets/guaravita.webp'
];

// Instalação do Service Worker e Cache dos Ativos
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache do PWA iniciado (WebP)');
            return cache.addAll(assets);
        })
    );
});

// Ativação e limpeza de caches antigos para evitar conflitos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Estratégia: Tenta encontrar no Cache, se não, busca na Rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

