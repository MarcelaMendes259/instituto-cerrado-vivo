const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{3,}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function obterMensagemErro(campo) {
    const valor = campo.value.trim();

    if (campo.id === 'nome') {
        if (!valor) return 'Informe o nome completo.';
        if (!regexNome.test(valor)) return 'Digite um nome válido com pelo menos 3 caracteres.';
    }

    if (campo.id === 'email') {
        if (!valor) return 'Informe o e-mail.';
        if (!regexEmail.test(valor)) return 'Digite um e-mail válido.';
    }

    if (campo.id === 'telefone') {
        const numeros = valor.replace(/\D/g, '');
        if (!numeros) return 'Informe o telefone.';
        if (numeros.length < 10 || numeros.length > 11) return 'Digite um telefone com DDD.';
    }

    return '';
}

function obterOuCriarMensagem(container, id) {
    let mensagem = container.querySelector(`#${id}`);

    if (!mensagem) {
        mensagem = document.createElement('small');
        mensagem.id = id;
        mensagem.className = 'field-error';
        container.appendChild(mensagem);
    }

    return mensagem;
}

function definirEstadoCampo(campo, erro) {
    const container = campo.closest('.form-field');
    if (!container) return !erro;

    const mensagemId = `${campo.id}-erro`;
    const mensagem = obterOuCriarMensagem(container, mensagemId);

    container.classList.remove('is-error', 'is-success');

    if (erro) {
        container.classList.add('is-error');
        campo.setAttribute('aria-invalid', 'true');
        campo.setAttribute('aria-describedby', mensagemId);
        mensagem.textContent = erro;
        return false;
    }

    container.classList.add('is-success');
    campo.setAttribute('aria-invalid', 'false');
    campo.removeAttribute('aria-describedby');
    mensagem.textContent = '';
    return true;
}

export function validarCampo(campo) {
    if (!campo.matches('#nome, #email, #telefone')) return true;
    return definirEstadoCampo(campo, obterMensagemErro(campo));
}

function validarInteresses(formulario) {
    const container = formulario.querySelector('.checkbox-grid');
    if (!container) return true;

    const selecionados = formulario.querySelectorAll('input[name="interesse"]:checked');
    const mensagem = obterOuCriarMensagem(container, 'interesse-erro');

    container.classList.remove('is-error', 'is-success');

    if (selecionados.length === 0) {
        container.classList.add('is-error');
        mensagem.textContent = 'Selecione pelo menos uma área de interesse.';
        return false;
    }

    container.classList.add('is-success');
    mensagem.textContent = '';
    return true;
}

function validarConsentimento(formulario) {
    const campo = formulario.querySelector('#consentimento');
    const container = formulario.querySelector('.consent-box');
    if (!campo || !container) return true;

    const mensagem = obterOuCriarMensagem(container, 'consentimento-erro');
    container.classList.remove('is-error', 'is-success');

    if (!campo.checked) {
        container.classList.add('is-error');
        campo.setAttribute('aria-invalid', 'true');
        mensagem.textContent = 'É necessário confirmar o consentimento.';
        return false;
    }

    container.classList.add('is-success');
    campo.setAttribute('aria-invalid', 'false');
    mensagem.textContent = '';
    return true;
}

export function validarGrupoAlterado(campo) {
    const formulario = campo.closest('#volunteer-form');
    if (!formulario) return true;

    if (campo.name === 'interesse') return validarInteresses(formulario);
    if (campo.id === 'consentimento') return validarConsentimento(formulario);

    return true;
}

export function validarFormulario(formulario) {
    const campos = [...formulario.querySelectorAll('#nome, #email, #telefone')];
    const camposValidos = campos.map(validarCampo).every(Boolean);
    const interessesValidos = validarInteresses(formulario);
    const consentimentoValido = validarConsentimento(formulario);

    const valido = camposValidos && interessesValidos && consentimentoValido;

    if (!valido) {
        const primeiroErro = formulario.querySelector('.is-error input');
        primeiroErro?.focus();
    }

    return valido;
}

export function obterDadosFormulario(formulario) {
    const dados = new FormData(formulario);

    return {
        nome: String(dados.get('nome') || '').trim(),
        email: String(dados.get('email') || '').trim(),
        telefone: String(dados.get('telefone') || '').trim(),
        interesses: dados.getAll('interesse'),
        consentimento: dados.get('consentimento') === 'on'
    };
}
