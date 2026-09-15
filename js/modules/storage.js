const STORAGE_KEY = 'institutoDfCerrado:voluntario';

export function salvarDadosVoluntario(dados) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

export function obterDadosVoluntario() {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);

    if (!dadosSalvos) return null;

    try {
        return JSON.parse(dadosSalvos);
    } catch (erro) {
        console.error('Não foi possível recuperar os dados salvos.', erro);
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
}

function restaurarFormulario() {
    const formulario = document.querySelector('#volunteer-form');
    if (!formulario) return;

    const dados = obterDadosVoluntario();
    if (!dados) return;

    const nome = formulario.querySelector('#nome');
    const email = formulario.querySelector('#email');
    const telefone = formulario.querySelector('#telefone');
    const consentimento = formulario.querySelector('#consentimento');

    if (nome) nome.value = dados.nome || '';
    if (email) email.value = dados.email || '';
    if (telefone) telefone.value = dados.telefone || '';
    if (consentimento) consentimento.checked = Boolean(dados.consentimento);

    formulario.querySelectorAll('input[name="interesse"]').forEach((campo) => {
        campo.checked = Array.isArray(dados.interesses)
            ? dados.interesses.includes(campo.value)
            : false;
    });

    const mensagem = formulario.querySelector('#form-message');
    if (mensagem) {
        mensagem.textContent = 'Dados anteriores restaurados neste navegador.';
    }
}

function tratarVoluntarioValidado(event) {
    salvarDadosVoluntario(event.detail.dados);

    const formulario = document.querySelector('#volunteer-form');
    const mensagem = formulario?.querySelector('#form-message');

    if (mensagem) {
        mensagem.textContent = 'Dados validados e salvos neste navegador.';
        mensagem.classList.add('is-success');
    }
}

function tratarPaginaRenderizada(event) {
    if (event.detail.rota === 'voluntariado') {
        restaurarFormulario();
    }
}

export function iniciarArmazenamento() {
    document.addEventListener('voluntario:validado', tratarVoluntarioValidado);
    document.addEventListener('spa:renderizada', tratarPaginaRenderizada);
}
