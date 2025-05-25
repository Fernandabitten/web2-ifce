// Seletores dos elementos
const previousOperationText = document.querySelector("#previous-operations");
const currentOperationText = document.querySelector("#current-operations");
const errorMessage = document.querySelector("#error");
const buttons = document.querySelectorAll("#buttons-container button");

// Variáveis de estado global
let currentNumber = "";
let firstOperand = null;
let operator = null;
let lastOperand = null; // Para repetir a operação no '='
let lastOperator = null;
let shouldResetScreen = false;

// currentOperationText.innerText = "0";
const MAX_DIGITS = 16;

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Se o botão tem data-op, é um operador
    if (btn.hasAttribute("data-op")) {
      processOperation(btn.getAttribute("data-op"));
    } else {
      // Caso contrário, pega o texto normalmente (números, etc)
      const value = e.target.innerText;
      if (!isNaN(value) || value === ",") {
        addDigit(value);
        // Não tem data-op mas é um operador
      } else {
        processOperation(value);
      }
    }
  });
});

// Função para adicionar dígitos
function addDigit(value) {
  if (shouldResetScreen) {
    currentNumber = "";
    shouldResetScreen = false;
  }
  // Calcular o comprimento do número, ignorando a vírgula para o limite de dígitos
  const currentNumberWithoutComma = currentNumber.replace(",", "");
  // Se o número atual (sem vírgula) já atingiu o limite de dígitos e o valor não é uma vírgula
  if (currentNumberWithoutComma.length >= MAX_DIGITS && value !== ",") {
    return; // Ignora a entrada do dígito
  }

  // Caso 1: Se o valor for uma vírgula
  if (value === ",") {
    // Se já tem vírgula, impede múltiplos pontos decimais
    if (currentNumber.includes(",")) {
      return;
    }
    // Se o número atual estiver vazio ou for apenas "0", adiciona "0,"
    if (currentNumber === "" || currentNumber === "0") {
      currentNumber = "0,";
    } else {
      // Caso contrário, apenas adiciona a vírgula
      currentNumber += value;
    }
  } else {
    // Caso 2: Se o valor for um dígito (0-9)
    // Se o número atual é "0", substitui pelo novo dígito (evita "05", "012")
    if (currentNumber === "0") {
      currentNumber = value;
    } else {
      // Caso contrário, apenas concatena o dígito
      currentNumber += value;
    }
  }

  // Garante que o display nunca fique vazio, sempre mostrando "0" se não há número
  if (currentNumber === "") {
    currentOperationText.innerText = "0";
    currentNumber = "0";
  } else {
    currentOperationText.innerText = currentNumber;
    adjustFontSize();
  }
}

function processOperation(operation) {
  switch (operation) {
    case "⌫":
      processDelOperator();
      break;
    case "C":
      processClearOperator();
      break;
    case "CE":
      processClearCurrentOperator();
      break;
    case "%":
      processPercentOperator();
      break;
    case "+/-":
      processToggleSign();
      break;
    case "2√x":
      processSqrtOperator();
      break;
    case "x2":
      processSquareOperator();
      break;
    case "1/x":
      processInverseOperator();
      break;
    case "=":
      processEqualOperator();
      break;
    case "+":
    case "-":
    case "x":
    case "÷":
      processMathOperator(operation);
      break;
    default:
      break;
  }
}

function processDelOperator() {
  // Se o previousOperationText termina com "=", limpa o histórico
  if (previousOperationText.innerText.endsWith("=")) {
    previousOperationText.innerText = "";
    return;
  }

  // Caso contrário, apaga o último dígito normalmente
  if (currentNumber !== "") {
    currentNumber = currentNumber.slice(0, -1);
    // Se currentNumber ficou vazio após apagar, define como "0"
    if (currentNumber === "") {
      currentOperationText.innerText = "0";
      currentNumber = "0";
    } else {
      currentOperationText.innerText = currentNumber;
    }
  }
}

function processClearOperator() {
  currentNumber = "0";
  currentOperationText.innerText = "0";
  previousOperationText.innerText = "";
  errorMessage.innerText = "";
  firstOperand = null;
  operator = null;
  shouldResetScreen = false;
  // Remove classe de inatividade dos botões
  buttons.forEach((btn) => {
    btn.classList.remove("button-disabled");
  });
}

function processClearCurrentOperator() {
  currentNumber = "0";
  currentOperationText.innerText = "0";
  if (previousOperationText.innerText.endsWith("=")) {
    previousOperationText.innerText = "";
    return;
  }
}

function processPercentOperator() {
  if (currentNumber === "") return;

  // Se já existe um operador e um primeiro operando, calcula o percentual relativo
  if (firstOperand !== null && operator) {
    const percentValue =
      (firstOperand * Number(currentNumber.replace(",", "."))) / 100;
    currentNumber = percentValue.toString().replace(".", ",");
    currentOperationText.innerText = currentNumber;
    adjustFontSize();
    // Atualiza o histórico para mostrar a operação com o valor percentual calculado
    previousOperationText.innerText = `${Number(
      firstOperand
    )} ${operator} ${currentNumber}`;
  } else {
    // Se não, apenas transforma o número atual em porcentagem (ex: 50% vira 0,5)
    currentNumber = (Number(currentNumber.replace(",", ".")) / 100)
      .toString()
      .replace(".", ",");
    currentOperationText.innerText = currentNumber;
    adjustFontSize();
    // Atualiza o histórico para mostrar apenas o valor percentual
    previousOperationText.innerText = currentNumbertoString().replace(".", ",");
  }
}

function processToggleSign() {
  if (currentNumber === "") return;

  let currentNum = Number(currentNumber.replace(",", "."));
  // Alterna o sinal multiplicando por -1
  currentNum = currentNum * -1;
  currentNumber = currentNum.toString().replace(".", ",");
  currentOperationText.innerText = currentNumber;
  adjustFontSize();
}

function processSqrtOperator() {
  if (currentNumber === "" && currentOperationText.innerText === "") return;
  // Usa o número atual ou o resultado exibido
  let value =
    currentNumber !== ""
      ? Number(currentNumber.replace(",", "."))
      : Number(currentOperationText.innerText.replace(",", "."));
  if (value < 0) {
    const mensagem = "Entrada inválida";
    processError(mensagem);
    return;
  }
  let result = Math.sqrt(value);
  currentOperationText.innerText = result.toString().replace(".", ",");
  previousOperationText.innerText = `√(${value})`;
  adjustFontSize();
  currentNumber = result.toString().replace(".", ",");
  shouldResetScreen = true;
}

function processSquareOperator() {
  if (currentNumber === "" && currentOperationText.innerText === "") return;
  let value =
    currentNumber !== ""
      ? Number(currentNumber.replace(",", "."))
      : Number(currentOperationText.innerText.replace(",", "."));
  let result = value * value;
  currentOperationText.innerText = result.toString().replace(".", ",");
  previousOperationText.innerText = `sqr(${currentNumber})`;
  adjustFontSize();
  currentNumber = result.toString().replace(".", ",");
  shouldResetScreen = true;
}

function processInverseOperator() {
  let value =
    currentNumber !== ""
      ? Number(currentNumber.replace(",", "."))
      : Number(currentOperationText.innerText.replace(",", "."));

  if (isNaN(value) || value === "") return;
  if (value === 0) {
    const mensagem = "Não é possível dividir por zero";
    processError(mensagem);
    previousOperationText.innerText = "";
    currentNumber = "";
    shouldResetScreen = true;
    return;
  }

  // Calcula o inverso
  let result = 1 / value;

  // Atualiza o visor e o estado
  currentOperationText.innerText = result.toString().replace(".", ",");
  previousOperationText.innerText = `1/(${value})`;
  adjustFontSize();
  currentNumber = result.toString().replace(".", ",");
  shouldResetScreen = true;
}

function processMathOperator(op) {
  // Caso o usuário clique em um operador sem digitar um novo número,
  // apenas atualiza o operador exibido
  if (currentNumber === "" && firstOperand !== null) {
    operator = op;
    previousOperationText.innerText = `${Number(firstOperand)} ${operator}`;
    return;
  }

  // Primeira vez que o operador é clicado: armazena o número atual como primeiro operando
  if (firstOperand === null) {
    firstOperand = Number(currentNumber.replace(",", "."));
  } else if (operator && currentNumber !== "") {
    // Já existe um operador e um número digitado: realiza a operação anterior, exibe no display e continua
    firstOperand = operate(
      firstOperand,
      Number(currentNumber.replace(",", ".")),
      operator
    );
    currentOperationText.innerText = firstOperand.toString().replace(".", ",");
    adjustFontSize();
  }
  operator = op;
  previousOperationText.innerText = `${firstOperand
    .toString()
    .replace(".", ",")} ${operator}`;
  lastOperand = Number(currentNumber.replace(",", ".")); // Armazena o último número digitado
  lastOperator = operator;
  shouldResetScreen = true;
  currentNumber = "";
}

function processEqualOperator() {
  if (operator === null && lastOperator === null) return;
  let secondOperand;

  // Se digitou um número antes de clicar em igual
  if (currentNumber !== "") {
    secondOperand = Number(currentNumber.replace(",", "."));
    lastOperand = secondOperand; // Salva para repetir se clicar em igual de novo
    lastOperator = operator;
  } else if (lastOperand !== null && lastOperator !== null) {
    secondOperand = lastOperand;
    operator = lastOperator;
  } else {
    return;
  }
  // Faz o cálculo
  const result = operate(firstOperand, secondOperand, operator);

  // Atualiza displays
  previousOperationText.innerText = `${Number(firstOperand)}${operator}${Number(
    secondOperand
  )}=`;

  if (result === "Erro") {
    const mensagem = "Não é possível dividir por zero";
    processError(mensagem);
  } else {
    currentOperationText.innerText = formatResult(result);
    adjustFontSize();
    // Prepara para próxima repetição
    firstOperand = result;
    shouldResetScreen = true;
    currentNumber = "";
  }
}

// Função de cálculo
function operate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "÷":
      return b !== 0 ? a / b : "Erro";
    default:
      return b;
  }
}

function processError(mensagem) {
  errorMessage.innerText = mensagem;
  // redefine estado da calculadora
  currentOperationText.innerText = "";
  currentNumber = "";
  firstOperand = null;
  operator = null;
  lastOperand = null;
  lastOperator = null;
  shouldResetScreen = true;
  // Adiciona classe de inatividade aos botões
  buttons.forEach((btn) => {
    // Verifica se o texto interno do botão não é "C"
    if (btn.innerText !== "C") {
      btn.classList.add("button-disabled");
    }
  });
}

function adjustFontSize() {
  const display = document.querySelector("#current-operations");
  const maxFontSize = 3;
  const minFontSize = 1;

  // Resetar para o tamanho de fonte padrão antes de medir para evitar looping de redução
  display.style.fontSize = `${maxFontSize}em`;

  // Loop para reduzir a fonte se o texto transbordar
  while (
    display.scrollWidth > display.clientWidth &&
    parseFloat(display.style.fontSize) > minFontSize
  ) {
    let currentSize = parseFloat(display.style.fontSize);
    display.style.fontSize = `${currentSize * 0.9}em`; // Reduz em 10%
  }
}

function formatResult(num) {
  if (typeof num === "string") return num; // Para "Erro"
  // Arredonda para 10 casas decimais e remove zeros desnecessários
  let rounded = Number(num.toFixed(10));
  // Troca ponto por vírgula para exibir no padrão brasileiro
  return rounded.toString().replace(".", ",");
}

function triggerButtonEffect(selector) {
  const btn = document.querySelector(selector);
  if (btn) {
    btn.classList.add("active-by-keyboard");
    setTimeout(() => btn.classList.remove("active-by-keyboard"), 120);
  }
}

document.addEventListener("keydown", (event) => {
  let key = event.key;
  let selector = null;

  // Números
  if (key >= "0" && key <= "9") {
    selector = `#buttons-container button.number[data-value="${key}"]`;
    addDigit(key);
  }

  // Operadores matemáticos
  if (key === "+" || key === "-") {
    selector = `#buttons-container button[data-op="${key}"]`;
    processMathOperator(key);
  }
  if (key === "*" || key === "x") {
    selector = `#buttons-container button[data-op="x"]`;
    processMathOperator("x");
  }
  if (key === "/" || key === "÷") {
    selector = `#buttons-container button[data-op="÷"]`;
    processMathOperator("÷");
  }

  // Igual (= ou Enter)
  if (key === "=" || key === "Enter") {
    selector = `#buttons-container button[data-op="="]`;
    processEqualOperator();
  }

  // Backspace apaga último dígito
  if (key === "Backspace") {
    selector = `#buttons-container button[data-op="⌫"]`;
    processDelOperator();
  }

  // Escape limpa tudo
  if (key === "Escape") {
    selector = `#buttons-container button[data-op="C"]`;
    processClearOperator();
  }

  // C limpa tudo (maiúsculo ou minúsculo)
  if (key.toLowerCase() === "c") {
    selector = `#buttons-container button[data-op="${key}"]`;
    processClearOperator();
  }

  // Porcentagem
  if (key === "%") {
    selector = `#buttons-container button[data-op="%"]`;
    processPercentOperator();
  }

  // Sinal (+/-) pelo F9 (padrão de calculadoras Windows)
  if (key === "F9") {
    selector = `#buttons-container button[data-op="+/-"]`;
    processToggleSign();
  }

  // Vírgula
  if (key === ",") {
    selector = `#buttons-container button[data-value="${key}"]`;
    addDigit(",");
  }

  if (key === ".") {
    selector = `#buttons-container button[data-value=","]`;
    addDigit(",");
  }

  // Dispara o efeito visual se encontrou o botão
  if (selector) {
    triggerButtonEffect(selector);
  }
});
