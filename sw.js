const CACHE_NAME = 'demetrio-v2'; // Mude a versão sempre que atualizar o código
const assets = [
    './',
    './index.html',
    './manifest.json',
    './assets/utensilios-de-cozinha.png',
    './assets/fundo-xadrez.png',
    './assets/fundo-churrasco.png'
];

// Instalação do Cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
    );
});

// Estratégia: Tenta a Internet primeiro, se falhar usa o Cache (Ideal para Cardápios)
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

