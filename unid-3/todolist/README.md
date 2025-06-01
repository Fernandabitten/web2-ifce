# To Do List com Voz – (Unidade 3 – Questão 1 – Manipulação do DOM)

![Status](https://img.shields.io/badge/progresso-100%25-green)

Uma aplicação web interativa que permite ao usuário criar, editar, concluir, remover e ouvir tarefas digitando ou por comandos de voz em português. O projeto explora manipulação do DOM, armazenamento local (localStorage) e integração com APIs nativas de reconhecimento e síntese de voz do navegador.

## Sobre o projeto

Este projeto é uma aplicação web simples desenvolvida como parte da **disciplina Desenvolvimento Web 2 do IFCE, referente à Unidade 3: Requisições Assíncronas e Integração com APIs, questão 1 -Manipulação do Dom.**

**O objetivo é exercitar a manipulação do DOM com JavaScript**, criando dinamicamente elementos HTML e possibilitando a interação do usuário com uma lista de tarefas.

## Funcionalidades

- ✅ Adicionar tarefas digitando ou por comando de voz
- ✅ Editar tarefas clicando no texto
- ✅ Marcar/Desmarcar como concluída
- ✅ Remover tarefas individualmente
- ✅ Limpar todas as tarefas por comando de voz
- ✅ Ler todas as tarefas em voz alta
- ✅ Alternar entre modo claro e escuro
- ✅ Ajuda interativa com comandos disponíveis
- ✅ Persistência das tarefas (mesmo após fechar o navegador)
- ✅ Interface responsiva e acessível

## Comandos de Voz Disponíveis

- Adicionar — O assistente pergunta o nome da tarefa.
- Ler tarefas — Lê em voz alta suas tarefas.
- Concluir tarefa [nome] — Marca a tarefa como concluída.
- Desmarcar tarefa [nome] — Remove o status de concluída.
- Excluir tarefa [nome] — Remove a tarefa da lista.
- Modo claro — Ativa o modo claro.
- Modo escuro — Ativa o modo escuro.
- Limpar tarefas — Remove todas as tarefas.
- Ajuda ou Quais são os comandos — Informa os comandos de voz disponíveis.

> ⚠️ Compatibilidade: O reconhecimento de voz funciona melhor no Google Chrome e Microsoft Edge. Não é compatível com Firefox, Safari e alguns navegadores móveis.

## Dicas de Uso

- Fale de forma clara e pausada para comandos de voz.
- Clique no texto da tarefa para editar rapidamente.
- Use o botão de alternância para trocar entre modo claro e escuro.
- Para melhor experiência, utilize em um computador com microfone.

## Estrutura do projeto

```
/
├── index.html             # Estrutura principal da página e modal de ajuda.
├── css/
│   └── styles.css         # Estilos básicos e responsividade
├── js/
│   ├── main.js            # Lógica principal, integração dos módulos e eventos
│   ├── tasks.js           # Manipulação da lista de tarefas e localStorage
│   └── voiceAssistant.js  # Reconhecimento e síntese de voz
└── img/
│    └── todo.png          # Imagem favicon
└── README.md              # Este arquivo
```

## Tecnologias Utilizadas

- HTML5 e CSS3 (com possibilidade de uso de Bootstrap)
- JavaScript ES6+ (módulos, funções de array, manipulação do DOM)
- Web Speech API (Reconhecimento e Síntese de Voz)
- localStorage para persistência de dados

## Como executar

1. Clone o repositório e acesse a pasta específica do projeto
   `git clone https://github.com/Fernandabitten/web2-ifce.git
cd unid-3/todolist`
2. Abra o arquivo index.html em seu navegador (preferencialmente Google Chrome ou Edge).
3. Permita o uso do microfone quando solicitado.
4. Use a interface para adicionar tarefas ou utilize comandos de voz.

## Galeria de Imagens

<details>
  <summary>Ver Screenshots</summary>

  <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
    <img src="https://github.com/user-attachments/assets/0e259351-3f77-441d-9d33-df319fc385a7" alt="Screenshot 1" style="width: 300px;">
    <img src="https://github.com/user-attachments/assets/856e6c7c-84c0-49af-b3b9-78ead1d31bf6" alt="Screenshot 2" style="width: 300px;">
  </div>
</details>

 [👉 **Acesse aqui!!:** ](https://fernandabitten.github.io/web2-ifce/unid-3/todolist/)
