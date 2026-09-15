import {
    obterDadosFormulario,
    validarCampo,
    validarFormulario,
    validarGrupoAlterado
} from './validation.js';

function formatarTelefone(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);

    if (numeros.length > 10) {
        return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    if (numeros.length > 6) {
        return numeros.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
    }

    if (numeros.length > 2) {
        return numeros.replace(/(\d{2})(\d+)/, '($1) $2');
    }

    if (numeros.length > 0) {
        return `(${numeros}`;
    }

    return '';
}

function fecharMenuMobile() {
    const menu = document.querySelector('#main-menu');
    const botao = document.querySelector('.menu-button');

    menu?.classList.remove('open');
    botao?.setAttribute('aria-expanded', 'false');
}

function tratarClique(event) {
    const linkRota = event.target.closest('[data-route]');

    if (linkRota) {
        event.preventDefault();
        const rota = linkRota.dataset.route;
        window.location.hash = rota;
        fecharMenuMobile();
        return;
    }

    const botaoProjeto = event.target.closest('[data-project-modal]');

    if (botaoProjeto) {
        const titulo = botaoProjeto.dataset.projectModal;
        const card = botaoProjeto.closest('.project-card');
        card?.classList.toggle('active');
        botaoProjeto.textContent = card?.classList.contains('active')
            ? `${titulo} selecionado`
            : 'Saiba mais';
    }
}

function tratarInput(event) {
    const campo = event.target;

    if (campo.matches('#telefone')) {
        campo.value = formatarTelefone(campo.value);
    }

    if (campo.matches('#nome, #email, #telefone')) {
        validarCampo(campo);
    }
}

function tratarChange(event) {
    const campo = event.target;

    if (campo.matches('input[name="interesse"], #consentimento')) {
        validarGrupoAlterado(campo);
    }
}

function tratarSubmit(event) {
    const formulario = event.target;

    if (!formulario.matches('#volunteer-form')) return;

    event.preventDefault();

    const alerta = formulario.querySelector('#form-alert');
    const mensagem = formulario.querySelector('#form-message');

    alerta?.classList.remove('is-error');
    mensagem?.classList.remove('is-success');

    if (!validarFormulario(formulario)) {
        if (alerta) {
            alerta.textContent = 'Revise os campos destacados antes de enviar.';
            alerta.classList.add('is-error');
        }

        if (mensagem) mensagem.textContent = '';
        return;
    }

    const dados = obterDadosFormulario(formulario);

    if (alerta) alerta.textContent = '';

    if (mensagem) {
        mensagem.textContent = 'Dados validados com sucesso.';
        mensagem.classList.add('is-success');
    }

    document.dispatchEvent(new CustomEvent('voluntario:validado', {
        detail: { dados }
    }));
}

export function iniciarEventosGlobais() {
    document.addEventListener('click', tratarClique);
    document.addEventListener('input', tratarInput);
    document.addEventListener('change', tratarChange);
    document.addEventListener('submit', tratarSubmit);
}
