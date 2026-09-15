import { iniciarRoteador } from './modules/router.js';

const yearElement = document.querySelector('#current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const menuButton = document.querySelector('.menu-button');
const mainMenu = document.querySelector('#main-menu');

if (menuButton && mainMenu) {
    menuButton.addEventListener('click', () => {
        const aberto = mainMenu.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(aberto));
    });
}

mainMenu?.querySelectorAll('[data-route]').forEach((link) => {
    link.addEventListener('click', () => {
        mainMenu.classList.remove('open');
        menuButton?.setAttribute('aria-expanded', 'false');
    });
});

document.addEventListener('spa:renderizada', ({ detail }) => {
    document.querySelectorAll('[data-route]').forEach((link) => {
        const ativa = link.dataset.route === detail.rota;
        link.classList.toggle('active', ativa);
        if (ativa) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
});

iniciarRoteador();
