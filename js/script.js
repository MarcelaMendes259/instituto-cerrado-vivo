/* ==============================
   Instituto DF Cerrado
   Interações do Projeto II
   ============================== */

// Ano automático no rodapé
const yearElement = document.querySelector('#current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// --------------------------------------------------
// Menu responsivo (hambúrguer)
// --------------------------------------------------
const menuButton = document.querySelector('.menu-button');
const mainMenu = document.querySelector('#main-menu');

if (menuButton && mainMenu) {
    menuButton.innerHTML = '<span aria-hidden="true">☰</span> Menu';

    menuButton.addEventListener('click', () => {
        const isOpen = mainMenu.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });
}

// --------------------------------------------------
// Dropdown de navegação
// --------------------------------------------------
if (mainMenu && !mainMenu.querySelector('.nav-dropdown')) {
    const projectsLink = mainMenu.querySelector('a[href="projetos.html"]');

    if (projectsLink) {
        const dropdown = document.createElement('div');
        dropdown.className = 'nav-dropdown';

        const toggle = document.createElement('button');
        toggle.className = 'dropdown-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = 'Projetos <span aria-hidden="true">▾</span>';

        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu';
        dropdownMenu.innerHTML = `
            <a href="projetos.html">Todos os projetos</a>
            <a href="projetos.html#especies-protegidas">Biodiversidade</a>
            <a href="cadastro.html">Voluntariado</a>
        `;

        projectsLink.replaceWith(dropdown);
        dropdown.append(toggle, dropdownMenu);

        toggle.addEventListener('click', () => {
            const isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    }
}

// Fecha menu mobile ao escolher um link
mainMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        mainMenu.classList.remove('open');
        menuButton?.setAttribute('aria-expanded', 'false');
    });
});

// --------------------------------------------------
// Componentes de feedback: toast
// --------------------------------------------------
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
toastContainer.setAttribute('aria-live', 'polite');
toastContainer.setAttribute('aria-atomic', 'true');
document.body.appendChild(toastContainer);

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'info' ? 'toast-info' : ''}`;
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    window.setTimeout(() => {
        toast.classList.remove('show');
        window.setTimeout(() => toast.remove(), 250);
    }, 3800);
}

// --------------------------------------------------
// Modal acessível e reutilizável
// --------------------------------------------------
const modalBackdrop = document.createElement('div');
modalBackdrop.className = 'modal-backdrop';
modalBackdrop.setAttribute('aria-hidden', 'true');
modalBackdrop.innerHTML = `
    <section class="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
            <div>
                <span class="badge badge-success">Em andamento</span>
                <h2 id="modal-title">Informações do projeto</h2>
            </div>
            <button class="modal-close" type="button" aria-label="Fechar modal">×</button>
        </div>
        <div id="modal-content"></div>
        <div class="modal-actions">
            <a class="button button-primary" href="cadastro.html">Quero participar</a>
            <button class="button button-secondary modal-close-action" type="button">Fechar</button>
        </div>
    </section>
`;
document.body.appendChild(modalBackdrop);

const modalContent = modalBackdrop.querySelector('#modal-content');
const modalTitle = modalBackdrop.querySelector('#modal-title');
const modalCloseButton = modalBackdrop.querySelector('.modal-close');
const modalCloseAction = modalBackdrop.querySelector('.modal-close-action');
let lastFocusedElement = null;

function openModal(title, content, badgeText = 'Em andamento') {
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modalBackdrop.querySelector('.badge').textContent = badgeText;
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseButton.focus();
}

function closeModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocusedElement?.focus();
}

modalCloseButton.addEventListener('click', closeModal);
modalCloseAction.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) closeModal();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
    }
});

// --------------------------------------------------
// Badges e botões nos cards de projetos
// --------------------------------------------------
const projectCards = document.querySelectorAll('.project-card');
const projectBadges = ['Em andamento', 'Novas ações', 'Pesquisa ativa', 'Vagas abertas'];

projectCards.forEach((card, index) => {
    const content = card.querySelector('.project-content');
    const heading = content?.querySelector('h2');
    const paragraph = content?.querySelector('p:not(.project-tag)');

    if (!content || !heading || !paragraph) return;

    const badge = document.createElement('span');
    badge.className = `badge ${index === 1 ? 'badge-info' : index === 3 ? 'badge-highlight' : 'badge-success'}`;
    badge.textContent = projectBadges[index] || 'Em andamento';
    content.insertBefore(badge, heading);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button button-secondary project-more';
    button.textContent = 'Saiba mais';
    button.addEventListener('click', () => {
        openModal(
            heading.textContent,
            `<p>${paragraph.textContent.trim()}</p><p>Este componente demonstra a apresentação de informações adicionais sem retirar o usuário da página atual.</p>`,
            badge.textContent
        );
    });
    content.appendChild(button);
});

// Badges também nos cards da página inicial
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach((card, index) => {
    if (card.querySelector('.badge')) return;
    const badge = document.createElement('span');
    badge.className = index % 2 === 0 ? 'badge badge-success' : 'badge badge-info';
    badge.textContent = index % 2 === 0 ? 'Ação contínua' : 'Participação aberta';
    card.prepend(badge);
});

// --------------------------------------------------
// Máscaras do formulário
// --------------------------------------------------
function onlyNumbers(value) {
    return value.replace(/\D/g, '');
}

const cpfInput = document.querySelector('#cpf');
if (cpfInput) {
    cpfInput.addEventListener('input', (event) => {
        let value = onlyNumbers(event.target.value).slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        event.target.value = value;
    });
}

const phoneInput = document.querySelector('#telefone');
if (phoneInput) {
    phoneInput.addEventListener('input', (event) => {
        let value = onlyNumbers(event.target.value).slice(0, 11);

        if (value.length > 10) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d+)/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/(\d{0,2})/, '($1');
        }

        event.target.value = value;
    });
}

const cepInput = document.querySelector('#cep');
if (cepInput) {
    cepInput.addEventListener('input', (event) => {
        let value = onlyNumbers(event.target.value).slice(0, 8);
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        event.target.value = value;
    });
}

const motivationInput = document.querySelector('#motivacao');
const charCount = document.querySelector('#char-count');

if (motivationInput && charCount) {
    motivationInput.addEventListener('input', () => {
        charCount.textContent = motivationInput.value.length;
    });
}

// --------------------------------------------------
// Formulário: sucesso e erro com feedback visual
// --------------------------------------------------
const volunteerForm = document.querySelector('#volunteer-form');
const formMessage = document.querySelector('#form-message');
let invalidToastLocked = false;

if (volunteerForm) {
    volunteerForm.addEventListener('invalid', () => {
        if (!invalidToastLocked) {
            showToast('Há campos obrigatórios ou inválidos. Revise o campo destacado.', 'info');
            invalidToastLocked = true;
            window.setTimeout(() => {
                invalidToastLocked = false;
            }, 1200);
        }
    }, true);
}

if (volunteerForm && formMessage) {
    volunteerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        formMessage.className = 'form-message';

        const selectedInterests = volunteerForm.querySelectorAll('input[name="interesse"]:checked');

        if (selectedInterests.length === 0) {
            formMessage.textContent = 'Selecione pelo menos uma área de interesse.';
            formMessage.classList.add('is-error');
            showToast('Revise os campos obrigatórios do formulário.', 'info');
            volunteerForm.querySelector('input[name="interesse"]')?.focus();
            return;
        }

        if (!volunteerForm.checkValidity()) {
            formMessage.textContent = 'Existem campos obrigatórios que precisam ser corrigidos.';
            formMessage.classList.add('is-error');
            showToast('Existem campos obrigatórios que precisam ser corrigidos.', 'info');
            volunteerForm.reportValidity();
            return;
        }

        formMessage.textContent = 'Cadastro demonstrativo concluído com sucesso! Os dados não são enviados para um servidor.';
        formMessage.classList.add('is-success');
        showToast('Inscrição realizada com sucesso!');
        volunteerForm.reset();
        if (charCount) charCount.textContent = '0';
    });
}

// --------------------------------------------------
// Demonstração de apoio: modal em vez de alert()
// --------------------------------------------------
document.querySelectorAll('[data-demo-donation]').forEach((button) => {
    button.addEventListener('click', () => {
        openModal(
            'Apoie o Instituto DF Cerrado',
            '<p>Em uma plataforma real, esta área poderia encaminhar o usuário para um ambiente seguro de contribuição. Neste projeto acadêmico, nenhuma transação financeira é realizada.</p>',
            'Demonstração'
        );
    });
});

// Redes sociais fictícias: toast não obstrutivo
document.querySelectorAll('[data-demo-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        showToast('Link demonstrativo de rede social.', 'info');
    });
});
