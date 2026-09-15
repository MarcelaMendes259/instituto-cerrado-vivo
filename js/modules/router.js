import { templates } from './templates.js';

const app = document.querySelector('#app');

export function renderizarPagina(rota) {
    if (!app) return;

    app.innerHTML = '';
    const conteudo = templates[rota] || templates.inicio;
    app.insertAdjacentHTML('beforeend', conteudo);
    app.focus({ preventScroll: true });
}

export function obterRotaAtual() {
    return window.location.hash.replace('#', '') || 'inicio';
}

export function carregarRotaAtual() {
    const rotaSolicitada = obterRotaAtual();
    const rota = templates[rotaSolicitada] ? rotaSolicitada : 'inicio';

    renderizarPagina(rota);
    document.dispatchEvent(new CustomEvent('spa:renderizada', { detail: { rota } }));
}

export function iniciarRoteador() {
    window.addEventListener('hashchange', carregarRotaAtual);
    carregarRotaAtual();
}
