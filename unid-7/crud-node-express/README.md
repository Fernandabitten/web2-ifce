# CRUD de Filmes – (Unidade 7 – Autenticação, Sessões e Proteção de Rotas)

![Status](https://img.shields.io/badge/progresso-100%25-green?style=for-the-badge)

![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)
![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000?style=for-the-badge&logo=express&logoColor=white)
![express-session](https://img.shields.io/badge/express--session-ff69b4?style=for-the-badge)
![bcrypt](https://img.shields.io/badge/bcrypt-4B8BBE?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-07405E.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=000)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E.svg?style=for-the-badge&logo=supabase&logoColor=white)

👉 [Acesse o deploy aqui!!](https://fernandabitten.github.io/web2-ifce/unid-7/crud-node-express/frontend/login.html)

Este projeto foi desenvolvido como parte das **Unidades 5, 6 e 7** da disciplina **Desenvolvimento Web II** do **IFCE**, cujo objetivo é aplicar na prática os conceitos de **requisições HTTP** e **APIs RESTful**, utilizando os métodos **GET**, **POST**, **PUT** e **DELETE** para manipular recursos via uma interface web. **Persistencia dos dados com SQLite e Node.js** e **Autenticação, Sessões e Proteção de Rotas, utilizando bcrypt para senhas e express-session para controle de sessões.**
Conta com um sistema completo de autenticação e autorização de usuários, utilizando bcrypt para senhas e express-session para controle de sessões.

## Tecnologias Utilizadas

- **Frontend**:
  HTML5,
  CSS3,
  JavaScript (Vanilla)
- **Backend**:
  Node.js,
  Express.js,
  SQLite (armazenamento local de dados),
  bcrypt (hash de senhas),
  express-session (gerenciamento de sessões),
  dotenv (variáveis de ambiente)
- **Armazenamento de arquivos (avatar)**:
  Supabase Storage
- **Hospedagem**:
  - Frontend: GitHub Pages
  - Backend: Render

---

## Funcionalidades

**CRUD de Filmes/Séries (unidade 5)**

- [x] Adicionar novo filme/série
- [x] Listar todos os registros
- [x] Buscar filme/série por ID
- [x] Atualizar informações
- [x] Excluir filme/série por ID

**Persistência com SQLite (Unidade 6)**

- [x] Armazenamento dos filmes em banco de dados SQLite
- [x] Criação da tabela filmes com campos id, titulo, genero e nota
- [x] Validação de nota entre 0 e 10
- [x] Substituição completa da lógica de array por comandos SQL

**Autenticação e Sessão (Unidade 7)**

- [x] Cadastro de usuário com hash seguro da senha (bcrypt)
- [x] Login com verificação de senha e criação de sessão
- [x] Logout e manutenção da sessão do usuário
- [x] Proteção de rotas para garantir acesso apenas a usuários autenticados
- [x] Sistema de autorização para que apenas administradores ou dono do filme possam excluir filmes
- [x] Upload de imagem de avatar para o Supabase com troca automática de imagem
- [x] Interface dinâmica com saudação ao usuário logado e foto de perfil

**Upload e Avatar**

- [x] Upload de imagem de avatar para o Supabase Storage
- [x] Substituição automática da imagem anterior
- [x] Interface dinâmica com saudação personalizada e exibição do avatar do usuário

---

## Regras do Sistema

- O ID de cada filme ou usuário é gerado automaticamente no backend via SQLite.
- A nota deve ser obrigatoriamente entre 0 e 10.
- Os dados são armazenados de forma persistente no banco de dados SQLite (filmes.db), garantindo que não sejam perdidos ao reiniciar o servidor.
- A interface web permite buscar, editar e remover registros com facilidade.
- Apenas usuários autenticados podem acessar as funcionalidades principais.
- Apenas usuários administradores ou donos do conteúdo podem excluir filmes.

---

## Estrutura do projeto

```
crud-node-express/
├── backend/
│   ├── package-lock.json
│   ├── package.json
│   ├── filmes.db                 # Banco de dados SQLite com os filmes e usuários
│   ├── database.js               # Conexão com o SQLite e criação de tabelas
│   ├── supabase.js               # Upload/exclusão de avatar no Supabase Storage
│   └── server.js                 # Servidor Node.js
├── frontend/
│   ├── img/                      # Imagens utilizadas na interface
│   ├── scripts/                  # Scripts JavaScript do frontend
│   │   ├── app.js                # Lida com listagem, busca e exclusão de filmes
│   │   ├── login.js              # Tela de login e controle de sessão
│   │   ├── register.js           # Tela de cadastro de novo usuário
│   │   ├── new-movie.js          # Cadastro/edição de filmes
│   │   └── profile.js            # Edição de perfil e troca de avatar
│   ├── css/                      # Arquivos CSS utilizados pela aplicação
│   ├── index.html                # Página principal (listar filmes/séries)
│   ├── login.html                # Página de login
│   ├── register.html             # Página de cadastro
│   ├── profile.html              # Página de perfil do usuário
│   └── new-movie.html            # Página para adicionar/editar filmes
│
└── docs/
    └── Espe_Caso_de_Uso_Crud_de_Filmes.pdf  # Documento de especificação
```

## Como Rodar o Projeto Localmente

✅ Requisitos:

- Node.js instalado
- Git instalado
- Conta no Supabase (apenas se desejar usar upload de avatar)
- Conta no Render (para deploy do backend)

```
# 1. Clone o repositório
git clone https://github.com/Fernandabitten/web2-ifce.git

# 2. Vá para a pasta do projeto
cd unid-7/crud-node-express/backend

# 3. Instale as dependências do backend
npm install

# 4. Crie um arquivo `.env` com o conteúdo abaixo:
SUPABASE_URL=URL_DO_SEU_SUPABASE
SUPABASE_KEY=CHAVE_DO_SEU_SUPABASE
NODE_ENV=development
SESSION_SECRET=sua_senha_secreta_segura

# 5. Inicie o servidor
npm start

```

> O backend estará rodando em: http://localhost:3000

**Executar o Frontend**
No seu navegador, abra o seguinte arquivo:
`http://localhost:5500/unid-7/crud-node-express/frontend/login.html`
Ou acesse diretamente o deploy no GitHub Pages:
👉 https://fernandabitten.github.io/web2-ifce/unid-7/crud-node-express/frontend/login.html

---

## Links Importantes

- 🔗 Frontend: [Deploy no GitHub Pages](https://fernandabitten.github.io/web2-ifce/unid-7/crud-node-express/frontend/login.html)
- 🔗 Backend: [Deploy no Render](https://web2-ifce-filmes-backend.onrender.com)

---

## Fluxo de Autenticação e Sessão
**Obs** : Para testar o fluxo do usuaário admin use admin@email.com - senha: 123

**1. Cadastro**

- Acesse a página register.html (criar conta)
- Preencha nome, email, senha e clique em “Cadastrar”
- O sistema cria o usuário e redireciona para o login

**2. Login**

- Acesse login.html
- Preencha email e senha
- Se estiver correto, você será redirecionado à index.html já logado
- A saudação e avatar do usuário são carregados no topo

**3. Sessão**

- Após o login, o cookie de sessão é criado automaticamente
- Em rotas protegidas (/movies, /me, /movie/:id), se não houver sessão, a API retorna 401 Unauthorized
- Se o cookie estiver presente, o usuário continua autenticado mesmo ao atualizar a página

**4. Logout**

- Clique no avatar > botão "Sair"
- O cookie de sessão é destruído e o usuário é redirecionado para o login

**5. Proteção de Rotas**

- Apenas usuários autenticados podem acessar ou manipular os filmes
- Se não autenticado, qualquer tentativa retorna 401
- Exclusão de filmes só é permitida para usuários dono do filme ou com papel "admin". Caso contrário, retorna 403 Forbidden
- Usuários com papel admin tem acesso aos filmes de todos os usuários

**6. Upload de Avatar**

- Usuários podem alterar sua foto de perfil em profile.html
- A imagem é enviada para o Supabase e salva com um nome único
- O backend remove a imagem anterior do Supabase automaticamente ao atualizar
- A nova imagem aparece instantaneamente após salvar

## Documentação

O projeto conta com uma especificação completa de casos de uso, descrevendo detalhadamente os fluxos de cadastro, listagem, edição e exclusão de filmes ou séries, além de regras de negócio e requisitos não funcionais.

A especificação de casos de uso foi elaborada por mim com base nos conhecimentos adquiridos na disciplina de **Engenharia de Software**, servindo como apoio à modelagem e organização do projeto.

📎 Acesse o documento:  
👉 [Especificação de Casos de Uso (PDF)](https://fernandabitten.github.io/web2-ifce/crud-node-express/docs/Espe_Caso_%20de_%20Uso_Crud_de_Filmes.pdf)

> Obs.: o arquivo está disponível na pasta `docs/` do repositório.

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
    <img src="https://github.com/user-attachments/assets/24fe95b3-8ca2-4b4e-a25c-5e47c238d240" alt="Screenshot 1" style="width: 300px;">
    <img src="https://github.com/user-attachments/assets/63781067-7d3b-45bd-9489-0c42f920e46c" alt="Screenshot 1" style="width: 300px;">
    <img src="https://github.com/user-attachments/assets/bcb6a0c8-474b-498c-a2e4-7825a587d266" alt="Screenshot 1" style="width: 300px;">
    <img src="https://github.com/user-attachments/assets/0bd25f6e-cead-43d0-963e-3d2dff22e02d" alt="Screenshot 2" style="width: 300px;">
    <img src="https://github.com/user-attachments/assets/240f5250-2b2b-4de9-83f8-8fe66be05978" alt="Screenshot 2" style="width: 300px;">
  </div>
</details>
