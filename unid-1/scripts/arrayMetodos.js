// 2.Manipulação de array com métodos de array
const numeros = [3, 7, 2, 9, 4];

function maiorNumero(array) {
  return Math.max(...array);
}

function menorNumero(array) {
  return Math.min(...array);
}

function dobro(array) {
  return array.map((num) => num * 2);
}

function numerosMaioresQueCinco(array) {
  return array.filter((num) => num > 5);
}

function executarArray() {
  console.log(`O maior número é: ${maiorNumero(numeros)}`);
  console.log(`O menor número é: ${menorNumero(numeros)}`);
  console.log(`Dobro dos números: ${dobro(numeros)}`);
  console.log(
    `Números maiores que cinco: ${numerosMaioresQueCinco(numeros).join(", ")}`
  );
}
