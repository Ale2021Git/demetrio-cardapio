const CACHE_NAME = 'demetrio-v1';

const assets = [
    './',
    './index.html',
    './manifest.json',
    './assets/churrasco.png',
    './assets/calabresa.png',
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
    './assets/fundo-xadrez.png',
    './assets/utensilios-de-cozinha.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(res => res || fetch(event.request))
    );
});

