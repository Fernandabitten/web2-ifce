# Calculadora Web – (Unidade 2 – Manipulando o DOM com JavaScript)

![Status](https://img.shields.io/badge/progresso-100%25-green)

Projeto desenvolvido para a disciplina **Desenvolvimento Web 2**
Atividade – **Calculadora Web com JavaScript, HTML e CSS**

## Objetivo

Criar uma calculadora funcional utilizando HTML, CSS e JavaScript, aplicando conceitos de:

- Manipulação do DOM
- Eventos
- Interatividade
- Lógica de programação
- Boas práticas de desenvolvimento web
- Experiência do usuário.

## Estrutura do projeto

```
unid-2/
  ├── index.html       # Estrutura da calculadora e inclusão da Font Awesome.
  ├── css/
  │ └── style.css      #  Estilização moderna, responsiva e com efeitos visuais nos botões.
  ├── js/
  │ ├── script.js      # Toda a lógica da calculadora, manipulação do DOM e tratamento dos eventos.
  └── README.md        # Este arquivo
```

## Funcionalidades

- ✅ Realiza as quatro operações básicas:

  - Adição (+)
  - Subtração (−)
  - Multiplicação (×)
  - Divisão (÷)

- ✅ Suporte a:

  - Porcentagem (%)
  - Inversão de sinal (+/-)
  - Raiz quadrada (2√x)
  - Potência (x2)
  - Inverso (1/x)
  - Backspace (⌫)

- ✅ Separador decimal com vírgula (padrão brasileiro)

- ✅ Histórico da operação exibido no topo

- ✅ Suporte completo ao teclado

- ✅ Tratamento de erros (ex: divisão por zero exibe "Erro")

- ✅ Repetição de última operação ao pressionar "=" múltiplas vezes

- ✅ Exibição clara da expressão no histórico (ex: 3+2=, 5+2=, etc.)

- ✅ Limpeza do histórico ao pressionar backspace após "="

## Interface e Estilo

- Layout centralizado e responsivo
- Cores modernas e agradáveis
- Botões com efeito hover e active (transform: scale(0.95))
- Ícones Font Awesome para Backspace, porcentagem, etc.
- Display organizado para números e operações anteriores

## Requisitos Atendidos

- [x] Estrutura HTML organizada, com display e botões para números e operações
- [x] CSS caprichado, layout centralizado, responsivo e com efeitos visuais
- [x] Interatividade com JavaScript, manipulação do DOM e eventos
- [x] Separação dos arquivos (HTML, CSS, JS)
- [x] Código JS modularizado em funções e comentado
- [x] Ícones Font Awesome nos botões

## Como executar

1. Faça download do repositório
2. Abra o index.html em um navegador moderno (Google Chrome, Firefox, etc.)
3. Use os botões ou o teclado para realizar cálculos normalmente

## Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox, Grid, efeitos modernos)
- JavaScript (manipulação do DOM, lógica de operações)
- Font Awesome para ícones

## Exemplos de uso

- Digite 5 + 10 % → Histórico mostra 5 + 0,5
- Digite 12 ÷ 0 → O display exibe "Erro" e todos os botões ficam bloqueados, exceto o botão "C" (Clear).
- Digite 3 + 2 = → Histórico mostra 3+2=
- Pressione = novamente → Histórico mostra 5+2=
- Troque de operador → Histórico mostra 7-
- Pressione ⌫ após um resultado → Histórico é limpo

## Galeria de Imagens

<details>
  <summary>Ver Screenshots</summary>

  <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
    <img src="https://github.com/user-attachments/assets/6c97bc6c-7ee7-4c38-90f4-1cf73deafa09" alt="Screenshot 1" style="width: 300px;">
    <img src="https://github.com/user-attachments/assets/ae33b582-0b2a-4b3b-a56b-34b0dadc9318" alt="Screenshot 2" style="width: 300px;">
    <img src="https://github.com/user-attachments/assets/8d4ca7e3-a737-4767-83e5-1daa2818c2a1" alt="Screenshot 2" style="width: 300px;">
  </div>
</details>

 [👉 **Acesse aqui!!:** ](https://fernandabitten.github.io/web2-ifce/unid-2/)
