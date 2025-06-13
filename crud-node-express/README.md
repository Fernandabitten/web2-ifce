# CRUD de Filmes – (Unidade 5 – HTTP e REST API)

![Status](https://img.shields.io/badge/progresso-100%25-green)

👉 [Acesse o deploy aqui!!](https://fernandabitten.github.io/web2-ifce/crud-node-express/frontend/index.html)

Este projeto foi desenvolvido como parte da **Unidade 5** da disciplina **Desenvolvimento Web II** do **IFCE**, cujo objetivo é aplicar na prática os conceitos de **requisições HTTP** e **APIs RESTful**, utilizando os métodos **GET**, **POST**, **PUT** e **DELETE** para manipular recursos via uma interface web.

## Objetivo da Atividade

Construir um sistema completo (frontend e backend) que permita ao usuário **cadastrar, visualizar, atualizar e excluir filmes ou séries favoritos**, com base nos conceitos de APIs REST e operações CRUD.

---

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Hospedagem**:
  - Frontend: GitHub Pages
  - Backend: Render

---

## Funcionalidades

- [x] Adicionar novo filme/série
- [x] Listar todos os registros
- [x] Buscar filme/série por ID
- [x] Atualizar informações
- [x] Excluir filme/série por ID

---

### 🧾 Informações de cada filme/série:

- **ID** (gerado automaticamente)
- **Título**
- **Gênero**
- **Nota** (de 0 a 10)

---

## Regras do Sistema

- O ID é único e gerado automaticamente no backend.
- A nota deve ser obrigatoriamente entre 0 e 10.
- Os dados são armazenados em **memória**, ou seja, serão apagados quando o servidor reiniciar.
- Todos os campos devem estar acessíveis e organizados no frontend.
- A interface permite buscar, editar e remover registros com facilidade.

---

## Estrutura do projeto

```
crud-node-express/
├── backend/
│   ├── package-lock.json
│   ├── package.json
│   └── server.js                  # Servidor Node.js
└── frontend/
    ├── img/                       # Imagens utilizadas na interface
    ├── scripts/                   # Scripts JavaScript do frontend
    │   ├── app.js                 # Lida com a listagem, busca e exclusão de filmes/séries
    │   └── new-movie.js           # Lida com o cadastro e edição de filmes/séries
    ├── css/                       # Arquivos CSS utilizados pela aplicação
    │   ├── styles-new-movie.css   # Estilização da página principal (index.html)
    │   └── styles.css             # Estilização da página de cadastro/edição (new-movie.html)
    ├── index.html                 # Página inicial: exibe a lista de filmes/séries e opções
    └── new-movie.html             # Página para cadastrar ou editar um filme/série
```

## Como executar

1. Clone o repositório e acesse a pasta específica do projeto
   `git clone https://github.com/Fernandabitten/web2-ifce.git
cd crud-node-express`
2. `cd backend
npm install
node server.js`

---

## Links Importantes

- 🔗 Frontend: [Deploy no GitHub Pages](https://fernandabitten.github.io/web2-ifce/crud-node-express/frontend/index.html)
- 🔗 Backend: [Deploy no Render](https://web2-ifce.onrender.com/)

---

## Design do Projeto

O layout do projeto foi desenvolvido previamente no **Figma** e serve como guia para a implementação das páginas HTML.  
Acesse o protótipo interativo clicando no link abaixo:  
👉 [Protótipo no Figma](https://www.figma.com/proto/85MVyp2u2fKbMM6cq3usMR/Sem-t%C3%ADtulo?node-id=5-126&t=LNmbOzzlb8aCgYsc-0&scaling=min-zoom&content-scaling=fixed&page-id=5%3A113&starting-point-node-id=5%3A126)
Você deve ter uma conta <a href="https://www.figma.com/">Figma</a> para acessá-lo.

## Galeria de Imagens

<details>
  <summary>Ver Screenshots</summary>
  <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
    <img src="https://github.com/user-attachments/assets/8832bb27-c05a-4051-ae42-8001963541c7" alt="Screenshot 1" style="width: 300px;">
    <img src="https://github.com/user-attachments/assets/05378720-003c-40f6-8cf4-f2bee8f9e4a9" alt="Screenshot 2" style="width: 300px;">
  </div>
</details>
