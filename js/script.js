/* ==============================
   Instituto DF Cerrado
   Interações e máscaras simples
   ============================== */

// Ano automático no rodapé
const yearElement = document.querySelector('#current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Menu responsivo para telas menores
const menuButton = document.querySelector('.menu-button');
const mainMenu = document.querySelector('#main-menu');

if (menuButton && mainMenu) {
    menuButton.addEventListener('click', () => {
        const isOpen = mainMenu.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });
}

// Função auxiliar: mantém apenas números
function onlyNumbers(value) {
    return value.replace(/\D/g, '');
}

// Máscara de CPF: 000.000.000-00
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

// Máscara de telefone: (61) 99999-9999 ou (61) 9999-9999
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

// Máscara de CEP: 00000-000
const cepInput = document.querySelector('#cep');
if (cepInput) {
    cepInput.addEventListener('input', (event) => {
        let value = onlyNumbers(event.target.value).slice(0, 8);
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        event.target.value = value;
    });
}

// Contador da área de texto
const motivationInput = document.querySelector('#motivacao');
const charCount = document.querySelector('#char-count');

if (motivationInput && charCount) {
    motivationInput.addEventListener('input', () => {
        charCount.textContent = motivationInput.value.length;
    });
}

// Formulário demonstrativo: valida os campos, mas não envia dados para servidor
const volunteerForm = document.querySelector('#volunteer-form');
const formMessage = document.querySelector('#form-message');

if (volunteerForm && formMessage) {
    volunteerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const selectedInterests = volunteerForm.querySelectorAll('input[name="interesse"]:checked');

        if (selectedInterests.length === 0) {
            formMessage.textContent = 'Selecione pelo menos uma área de interesse.';
            const firstInterest = volunteerForm.querySelector('input[name="interesse"]');
            firstInterest?.focus();
            return;
        }

        if (!volunteerForm.checkValidity()) {
            volunteerForm.reportValidity();
            return;
        }

        formMessage.textContent = 'Cadastro demonstrativo concluído! Neste projeto acadêmico, os dados não são enviados para um servidor.';
        volunteerForm.reset();
        if (charCount) charCount.textContent = '0';
    });
}

// Botões que são apenas demonstração no projeto acadêmico
const donationButton = document.querySelector('[data-demo-donation]');
if (donationButton) {
    donationButton.addEventListener('click', () => {
        window.alert('Demonstração: em um site real, este botão levaria a uma página segura de contribuição.');
    });
}

document.querySelectorAll('[data-demo-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        window.alert('Link demonstrativo de rede social.');
    });
});
