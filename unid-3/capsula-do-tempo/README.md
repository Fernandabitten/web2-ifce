# Cápsula do Tempo Meteorológica – (Unidade 3 – Questão 2 – Requisição com Fetch)

![Status](https://img.shields.io/badge/progresso-100%25-green)

Este projeto é uma aplicação web interativa desenvolvida como parte da **Unidade 3 (Requisições Assíncronas e Integração com APIs) da disciplina de Desenvolvimento Web II do Curso Técnico em Informática para Internet do IFCE.**

O **objetivo** principal é demonstrar o uso de requisições assíncronas no front-end JavaScript, integrando-se a APIs públicas para buscar e exibir dados dinamicamente. A aplicação permite viajar no tempo meteorológico, exibindo o clima atual, o clima de uma data passada específica e uma previsão futura para qualquer cidade do mundo. Além disso, enriquece a experiência visual com imagens de fundo dinâmicas da cidade pesquisada.

## Objetivos da Unidade 3 Demonstrados

Este projeto cumpre os seguintes requisitos e objetivos da Unidade 3:

- Entender o que é uma API e como acessá-la usando JavaScript: **A aplicação se conecta a três APIs distintas (Open-Meteo, LocationIQ e Unsplash).**
- Realizar requisições com fetch() e tratar as respostas no formato JSON: **Todas as comunicações com as APIs são feitas utilizando a função fetch(), e as respostas são parseadas como JSON.**
- Aplicar os conceitos de then, catch e async/await para lidar com respostas assíncronas: **A lógica do projeto faz uso extensivo de async/await** para um tratamento mais legível e sequencial das Promises resultantes das requisições assíncronas. O bloco **try...catch** é utilizado para o tratamento de erros.
- Exibir essas informações dinamicamente no DOM, manipulando a estrutura da página de forma reativa: **Os dados recebidos das APIs são injetados no DOM, criando e populando cards de clima de forma dinâmica.**
- Criar e inserir elementos HTML via JavaScript: A função fillCard() demonstra a criação e inserção de novos elementos HTML (os cards de clima) no DOM, com base nos dados recebidos.
- Modificar ou remover partes da página conforme os dados recebidos da API: Os cards de clima são adicionados e removidos dinamicamente (clearCards()) a cada nova busca, e seus conteúdos são atualizados.
- Tratar erros com .catch() caso a requisição falhe ou não encontre dados: O tratamento de erros é feito via try...catch e modais informativos são exibidos ao usuário.

## Recursos da Aplicação

- ✅ Clima Atual: Obtenha informações meteorológicas em tempo real para a cidade desejada.
- ✅ Clima no Passado: Consulte dados históricos do clima para uma data específica.
- ✅ Previsão Futura: Veja a previsão do tempo para o próximo dia
- ✅ Imagens de Fundo Dinâmicas: Cada card de clima (Atual, Passado, Futuro) é enriquecido com uma imagem de fundo da cidade pesquisada.
- ✅ Interface Intuitiva: Design responsivo e amigável, construído com Tailwind CSS, garantindo uma boa experiência em diferentes dispositivos.
- ✅ Modais de Mensagem: Feedback claro e amigável ao usuário sobre erros, sucesso ou informações importantes.
- ✅ Modularização: O código JavaScript é modularizado para melhor organização, manutenção e escalabilidade.

## Tecnologias Utilizadas

- HTML5: Estrutura semântica da aplicação.
- CSS3: Estilização e responsividade da interface.
- Tailwind CSS: Framework CSS de utilitários para um desenvolvimento rápido e responsivo da interface.
- JavaScript (ES Modules): Lógica principal, requisições de API, manipulação do DOM e interatividade.
- **APIs Consumidas:**
  - **Open-Meteo API:** Fonte primária para dados meteorológicos (temperatura, umidade, condições, vento, precipitação).
  - **Unsplash API:** Usada para buscar imagens de fundo da cidade, enriquecendo a apresentação visual dos cards.

## Como executar

1. Clone o repositório e acesse a pasta específica do projeto
   `git clone https://github.com/Fernandabitten/web2-ifce.git
cd unid-3/capsula-do-tempo`
2. Obtenha suas Chaves de API:

- Este projeto requer chaves de API para funcionar corretamente. **É essencial obter sua própria chave gratuita (para fins de desenvolvimento/teste)** em:
  - Unsplash: https://unsplash.com/developers

3. Crie o Arquivo de Configuração (config.js):
   Na raiz do seu projeto, crie um arquivo chamado config.js e adicione suas chaves de API conforme o exemplo abaixo:
   `
   // config.js
   > const UNSPLASH_API_KEY = "SUA_CHAVE_DA_UNSPLASH_AQUI";
   > `

**Substitua "SUA_CHAVE_DA_UNSPLASH_AQUI" pelas sua chave real.**

4. Abra o Projeto no Navegador:
   Basta abrir o arquivo index.html diretamente em seu navegador webpreferido.

5. Interaja com a Aplicação:

- No campo "Cidade", digite o nome da localidade desejada (Ex: "São Paulo", "Rio de Janeiro", "Maranguape").
- No campo "Data Passada", selecione uma data no passado. A data máxima permitida é de 2 dias anteriores ao dia atual (anteontem), devido às limitações do histórico da API Open-Meteo para a camada gratuita.
- Clique no botão "Viajar no Tempo!" para que o JavaScript realize as requisições assíncronas e exiba os dados na página.

## Estrutura do projeto

```

├── index.html           # Arquivo principal
├── style.css            # Estilos do projeto
└── js/
    ├── main.js          # Arquivo JavaScript principal, que orquestra os outros módulos.
    ├── api.js           # Contém todas as funções relacionadas às requisições para APIs externas (Unsplash, Open-Meteo).
    ├── ui.js            # Agrupa as funções que manipulam a interface do usuário (DOM, preenchimento de cards, exibição de modais, formatação de data).
    ├── domSelectors.js  # Armazena as referências aos elementos DOM que são usados em múltiplos lugares.
    └── constants.js     # Guarda as constantes globais
├── assets/
    └── img/
        └── (imagens do projeto)
└── README.md
```

# Contribuição

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

# Licença

Este projeto está licenciado sob a licença MIT.
