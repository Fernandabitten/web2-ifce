// 5.Laços, condicionais e manipulação de string

function tamanhoPalavra(texto) {
  return texto.length;
}

function isPalindromo(texto) {
  const strReversa = texto.split("").reverse().join("");
  return texto === strReversa;
}

function verificarPalindromo() {
  const texto = document.getElementById("palavra").value;
  const resultadoElem = document.getElementById("resultadoPalindromo");
  const tamanhoElem = document.getElementById("tamanhoPalavra");

  // Limpa os resultados anteriores
  resultadoElem.classList.remove("erro"); // limpa erro anterior
  tamanhoElem.textContent = ""; // limpa o tamanho anterior

  if (!texto) {
    resultadoElem.textContent = "Por favor, insira uma palavra.";
    resultadoElem.classList.add("erro");
    return;
  }

  if (texto.length < 2) {
    resultadoElem.textContent = "A palavra deve ter pelo menos 2 letras.";
    resultadoElem.classList.add("erro");
    return;
  }

  if (texto.length > 20) {
    resultadoElem.textContent = "A palavra deve ter no máximo 20 letras.";
    resultadoElem.classList.add("erro");
    return;
  }

  if (!/^[a-zA-Z]+$/.test(texto)) {
    resultadoElem.textContent = "A palavra deve conter apenas letras.";
    resultadoElem.classList.add("erro");
    return;
  }

  const tamanho = tamanhoPalavra(texto);
  const resultado = isPalindromo(texto)
    ? `A palavra "${texto}" é um palíndromo.`
    : `A palavra "${texto}" não é um palíndromo.`;

  resultadoElem.textContent = resultado;
  resultadoElem.classList.remove("erro"); // mensagem de sucesso
  tamanhoElem.textContent = `A palavra tem ${tamanho} letras.`;
}
