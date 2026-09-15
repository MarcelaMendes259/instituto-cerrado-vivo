export const templates = {
    inicio: `
        <section class="hero">
            <div class="container hero-grid">
                <div class="hero-copy">
                    <p class="eyebrow">Conservação do Cerrado • Brasília, DF</p>
                    <h1>Ciência e conservação para proteger a biodiversidade do Cerrado.</h1>
                    <p class="hero-text">O Instituto DF Cerrado é uma organização fictícia dedicada ao apoio a unidades de conservação, pesquisa, educação ambiental e participação social no Distrito Federal.</p>
                    <div class="hero-actions">
                        <a class="button button-primary" href="#projetos" data-route="projetos">Conheça nossos projetos</a>
                        <a class="button button-secondary" href="#voluntariado" data-route="voluntariado">Quero ser voluntário</a>
                    </div>
                </div>
                <figure class="hero-image">
                    <img src="../imagens/cerrado-hero.jpg" alt="Ilustração minimalista de paisagem do Cerrado com vegetação, céu e silhueta de lobo-guará.">
                </figure>
            </div>
        </section>

        <section class="section section-soft">
            <div class="container">
                <div class="section-heading">
                    <p class="eyebrow">Nossa missão</p>
                    <h2>Quatro frentes de atuação</h2>
                    <p>Conservação aplicada, pesquisa e educação para fortalecer a relação entre pessoas e áreas naturais.</p>
                </div>
                <div class="card-grid four-columns">
                    <article class="info-card"><span class="badge badge-success">Ação contínua</span><span class="card-number">01</span><h3>Unidades de conservação</h3><p>Apoio a ações de conservação, visitação responsável e valorização de parques e reservas.</p></article>
                    <article class="info-card"><span class="badge badge-info">Participação aberta</span><span class="card-number">02</span><h3>Pesquisa</h3><p>Monitoramento de fauna e flora, produção de dados e incentivo à ciência cidadã.</p></article>
                    <article class="info-card"><span class="badge badge-success">Ação contínua</span><span class="card-number">03</span><h3>Educação ambiental</h3><p>Atividades educativas, trilhas interpretativas e ações com estudantes e visitantes.</p></article>
                    <article class="info-card"><span class="badge badge-info">Participação aberta</span><span class="card-number">04</span><h3>Recuperação ambiental</h3><p>Mobilização para recuperação de áreas degradadas e proteção da vegetação nativa.</p></article>
                </div>
            </div>
        </section>
    `,

    projetos: `
        <section class="page-hero">
            <div class="container page-hero-content">
                <p class="eyebrow">Projetos e iniciativas</p>
                <h1>Pesquisa, educação e ação local para conservar o Cerrado.</h1>
                <p>Os projetos abaixo são fictícios e simulam uma atuação integrada em áreas naturais do Distrito Federal.</p>
            </div>
        </section>

        <div class="section">
            <div class="container project-list">
                <article class="project-card">
                    <div class="project-visual purple-gradient"><img src="../imagens/lobo.png" alt="Ilustração de lobo-guará."></div>
                    <div class="project-content"><p class="project-tag">Fauna • Monitoramento</p><span class="badge badge-success">Em andamento</span><h2>Guardiões do Cerrado</h2><p>Projeto de monitoramento de mamíferos de médio e grande porte em áreas protegidas.</p><button class="button button-secondary" type="button" data-project-modal="Guardiões do Cerrado">Saiba mais</button></div>
                </article>
                <article class="project-card reverse">
                    <div class="project-visual dark-gradient"><img src="../imagens/galito.jpg" alt="Ilustração da ave galito."></div>
                    <div class="project-content"><p class="project-tag">Campos naturais • Aves</p><span class="badge badge-info">Novas ações</span><h2>Campos Vivos</h2><p>Iniciativa voltada ao reconhecimento e valorização dos ambientes campestres do Cerrado.</p><button class="button button-secondary" type="button" data-project-modal="Campos Vivos">Saiba mais</button></div>
                </article>
                <article class="project-card">
                    <div class="project-visual light-gradient"><img src="../imagens/lobelia.png" alt="Ilustração de lobélia."></div>
                    <div class="project-content"><p class="project-tag">Flora • Pesquisa</p><span class="badge badge-success">Pesquisa ativa</span><h2>Flora do Cerrado</h2><p>Levantamento educativo de espécies vegetais nativas e de ambientes sensíveis.</p><button class="button button-secondary" type="button" data-project-modal="Flora do Cerrado">Saiba mais</button></div>
                </article>
            </div>
        </div>
    `,

    voluntariado: `
        <section class="page-hero compact">
            <div class="container page-hero-content">
                <p class="eyebrow">Voluntariado</p>
                <h1>Transforme interesse pela natureza em participação.</h1>
                <p>Preencha o formulário demonstrativo abaixo para registrar interesse nas ações do instituto.</p>
            </div>
        </section>

        <div class="section form-section">
            <div class="container form-layout">
                <aside class="form-aside">
                    <p class="eyebrow">Antes de começar</p>
                    <h2>Onde você pode colaborar?</h2>
                    <ul class="check-list"><li>Educação ambiental</li><li>Monitoramento de fauna e flora</li><li>Pesquisa e ciência cidadã</li><li>Recuperação ambiental</li></ul>
                </aside>

                <form class="volunteer-form" id="volunteer-form" novalidate>
                    <p class="form-message" id="form-alert" role="alert" aria-live="assertive"></p>
                    <fieldset>
                        <legend>Dados pessoais</legend>
                        <div class="form-grid two-columns">
                            <div class="form-field full-width"><label for="nome">Nome completo *</label><input type="text" id="nome" name="nome" required minlength="3" autocomplete="name"></div>
                            <div class="form-field"><label for="email">E-mail *</label><input type="email" id="email" name="email" required autocomplete="email"></div>
                            <div class="form-field"><label for="telefone">Telefone *</label><input type="tel" id="telefone" name="telefone" required></div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Área de interesse</legend>
                        <div class="checkbox-grid">
                            <label><input type="checkbox" name="interesse" value="educacao"> Educação ambiental</label>
                            <label><input type="checkbox" name="interesse" value="fauna"> Monitoramento da fauna</label>
                            <label><input type="checkbox" name="interesse" value="pesquisa"> Pesquisa</label>
                        </div>
                    </fieldset>
                    <div class="consent-box"><label><input type="checkbox" id="consentimento" name="consentimento" required> Concordo com o uso demonstrativo dos dados neste projeto acadêmico. *</label></div>
                    <button class="button button-primary submit-button" type="submit">Quero ser voluntário</button>
                    <p class="form-message" id="form-message" role="status" aria-live="polite"></p>
                </form>
            </div>
        </div>
    `,

    contato: `
        <section class="page-hero compact">
            <div class="container page-hero-content">
                <p class="eyebrow">Contato</p>
                <h1>Entre em contato com o Instituto DF Cerrado.</h1>
                <p>Este é um projeto acadêmico fictício criado para demonstrar recursos de desenvolvimento front-end.</p>
            </div>
        </section>
        <section class="section">
            <div class="container split-section">
                <div><h2>Fale conosco</h2><p>Use os canais demonstrativos abaixo para conhecer a proposta da aplicação.</p></div>
                <div><p><strong>E-mail:</strong> contato@institutodfcerrado.example</p><p><strong>Telefone:</strong> (61) 0000-0000</p><p><strong>Localização:</strong> Brasília, Distrito Federal</p></div>
            </div>
        </section>
    `
};
