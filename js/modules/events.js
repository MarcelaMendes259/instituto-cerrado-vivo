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

    if (campo.matches('input, textarea, select')) {
        campo.setAttribute('aria-invalid', String(!campo.checkValidity()));
    }
}

function tratarSubmit(event) {
    const formulario = event.target;

    if (!formulario.matches('#volunteer-form')) return;

    event.preventDefault();

    const dados = Object.fromEntries(new FormData(formulario).entries());
    const mensagem = formulario.querySelector('#form-message');

    if (mensagem) {
        mensagem.textContent = 'Dados recebidos pela aplicação. A validação será realizada antes do armazenamento.';
    }

    document.dispatchEvent(new CustomEvent('voluntario:enviado', {
        detail: { dados }
    }));
}

export function iniciarEventosGlobais() {
    document.addEventListener('click', tratarClique);
    document.addEventListener('input', tratarInput);
    document.addEventListener('submit', tratarSubmit);
}
