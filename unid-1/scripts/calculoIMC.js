// 1. Função com validação de entrada e retorno condicional

function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  // Classificação do IMC
  let classificacao;
  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc >= 18.5 && imc <= 24.99) {
    classificacao = "Peso normal";
  } else if (imc >= 25 && imc < 29.9) {
    classificacao = "Sobrepeso";
  } else {
    classificacao = "Obesidade";
  }
  // Retorna o IMC e a classificação
  return {
    imc: imc.toFixed(2),
    classificacao: classificacao,
  };
}

function executarIMC() {
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const resultadoIMC = document.getElementById("resultadoIMC");
  // Limpa os resultados anteriores
  resultadoIMC.textContent = ""; // limpa o resultado anterior
  resultadoIMC.classList.remove("erro"); // limpa erro anterior

  // Verifica se os campos estão vazios
  if (!peso || !altura) {
    resultadoIMC.textContent = "Por favor, preencha todos os campos.";
    resultadoIMC.classList.add("erro");
    return;
  }

  const resultado = calcularIMC(peso, altura);
  const output =
    typeof resultado === "string"
      ? resultado
      : `IMC: ${resultado.imc} - ${resultado.classificacao}`;
  resultadoIMC.textContent = output;
  // document.getElementById("resultadoIMC").textContent = output;
}
