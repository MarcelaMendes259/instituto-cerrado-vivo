# Instituto DF Cerrado

Projeto acadêmico de desenvolvimento front-end que simula o site de uma ONG fictícia voltada à conservação do Cerrado no Distrito Federal. A aplicação apresenta iniciativas de educação ambiental, pesquisa, conservação e participação social, além de uma área demonstrativa de voluntariado.

## Objetivo do projeto

O projeto foi desenvolvido para aplicar conceitos de desenvolvimento web, organização de código, responsividade, acessibilidade e versionamento com Git e GitHub. A proposta também aproxima tecnologia e educação ambiental em uma interface simples, informativa e acessível.

## Tecnologias utilizadas

- **HTML5** para a estrutura semântica da aplicação.
- **CSS3** para estilos, responsividade e adaptação a diferentes tamanhos de tela.
- **JavaScript (ES Modules)** para navegação, interação com a interface, geração dinâmica de conteúdo e validação de formulário.
- **Git e GitHub** para controle de versões, branches, issues e pull requests.
- **GitHub Pages** para publicação da aplicação.

## Estrutura do projeto

A aplicação utiliza uma página principal com navegação em formato SPA e módulos JavaScript separados por responsabilidade. O repositório também mantém arquivos produzidos em etapas anteriores do projeto acadêmico.

```text
instituto-df-cerrado/
├── index.html
├── cadastro.html
├── projetos.html
├── css/
├── js/
│   └── modules/
├── imagens/
├── html/
└── README.md
```

## Funcionalidades

- Navegação entre seções sem recarregamento completo da página.
- Geração dinâmica de cards de projetos e frentes de atuação.
- Formulário demonstrativo de voluntariado com validação em JavaScript.
- Máscara de telefone e mensagens de validação.
- Menu e layout responsivos para dispositivos móveis.
- Publicação do projeto no GitHub Pages.

## Acessibilidade

O projeto está em processo de revisão com base nas diretrizes **WCAG 2.1 nível AA**. Entre os recursos já utilizados estão estrutura semântica, textos alternativos em imagens, rótulos em campos de formulário, atributos ARIA, mensagens com `aria-live`, indicação da página atual com `aria-current` e melhorias de estado acessível em controles interativos.

## Responsividade

O layout foi adaptado para telas menores com media queries em CSS. Foram realizados ajustes em grids, espaçamentos, botões, imagens, cabeçalho, formulários e navegação para reduzir estouro horizontal e melhorar a experiência em dispositivos móveis.

## Como executar localmente

### Pré-requisitos

Não há dependências externas obrigatórias nesta etapa. É necessário apenas um navegador moderno e, de forma recomendada, o **Visual Studio Code** com a extensão **Live Server** ou outro servidor HTTP local.

### Execução

1. Clone ou baixe o repositório.
2. Abra a pasta do projeto no editor de código.
3. Execute `index.html` utilizando o Live Server ou outro servidor local.
4. Acesse o endereço informado pelo servidor no navegador.

Como a aplicação utiliza módulos JavaScript, recomenda-se executá-la por HTTP local em vez de abrir o arquivo diretamente pelo protocolo `file://`.

## Versionamento

O projeto utiliza uma organização inspirada no **GitFlow**:

- `main`: versão estável e publicada.
- `develop`: integração das alterações em desenvolvimento.
- `feature/*`: funcionalidades ou melhorias específicas antes da integração com `develop`.

As mensagens de commit seguem o padrão **Conventional Commits**, utilizando prefixos como `feat`, `fix` e `docs` para tornar o histórico mais claro e rastreável.

## Issues e Pull Requests

As issues são utilizadas para registrar tarefas e pontos de melhoria. As alterações desenvolvidas em branches secundárias são documentadas por meio de pull requests antes de serem integradas à branch de desenvolvimento.

## Build e testes

Nesta etapa, a aplicação ainda é executada diretamente como projeto front-end estático e não possui dependências de pacote, script de build ou suíte automatizada de testes. A configuração de build, otimização e testes será documentada quando esses recursos forem implementados na etapa de preparação para produção.

## Deploy

A versão estável do projeto é publicada com **GitHub Pages**. O deploy final será atualizado após a conclusão das etapas de acessibilidade, otimização e validação.

## Observação

Este é um projeto fictício desenvolvido exclusivamente para fins acadêmicos. Nenhuma doação ou dado inserido no formulário é enviado para um servidor real.
