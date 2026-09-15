import { iniciarRoteador } from './modules/router.js';
import { iniciarEventosGlobais } from './modules/events.js';
import { iniciarArmazenamento } from './modules/storage.js';

const yearElement = document.querySelector('#current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const menuButton = document.querySelector('.menu-button');
const mainMenu = document.querySelector('#main-menu');
const contrastToggle = document.querySelector('.contrast-toggle');
const root = document.documentElement;
const CONTRAST_KEY = 'instituto-df-cerrado-high-contrast';

function aplicarAltoContraste(ativo, persistir = false) {
    root.classList.toggle('high-contrast', ativo);

    if (contrastToggle) {
        contrastToggle.setAttribute('aria-pressed', String(ativo));
        contrastToggle.setAttribute(
            'aria-label',
            ativo ? 'Desativar modo de alto contraste' : 'Ativar modo de alto contraste'
        );
        contrastToggle.textContent = ativo ? 'Contraste padrão' : 'Alto contraste';
    }

    if (persistir) {
        root.classList.add('contrast-user-choice');
        localStorage.setItem(CONTRAST_KEY, String(ativo));
    }
}

const contrasteSalvo = localStorage.getItem(CONTRAST_KEY);
if (contrasteSalvo !== null) {
    root.classList.add('contrast-user-choice');
    aplicarAltoContraste(contrasteSalvo === 'true');
}

contrastToggle?.addEventListener('click', () => {
    aplicarAltoContraste(!root.classList.contains('high-contrast'), true);
});

if (menuButton && mainMenu) {
    menuButton.addEventListener('click', () => {
        const aberto = mainMenu.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(aberto));
    });
}

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

iniciarEventosGlobais();
iniciarArmazenamento();
iniciarRoteador();
