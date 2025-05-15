// 3. Criação e manipulação de objeto (sem classe)
const carro = {
  marca: "Toyota",
  modelo: "Corolla",
  ano: 2020,
  exibirInfo: function () {
    return console.log(
      `Marca: ${this.marca} Modelo: ${this.modelo} Ano: (${this.ano}) - Cor: ${this.cor}`
    );
  },
};

function executarCarro() {
  carro.exibirInfo();
  carro.cor = "Preto";
  carro.exibirInfo();
  carro.ano = 2025;
  carro.exibirInfo();
}
