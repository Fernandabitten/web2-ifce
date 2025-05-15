// 4. Orientação a Objetos (com classe e instância)
class Livro {
  constructor(titulo, autor, ano) {
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
  }

  detalhes() {
    return console.log(
      `Título: ${this.titulo} Autor: ${this.autor} Ano: (${this.ano})`
    );
  }
}

function executarLivro() {
  const livro1 = new Livro("1984", "George Orwell", 1949);
  const livro2 = new Livro("Dom Casmurro", "Machado de Assis", 1899);
  livro1.detalhes();
  livro2.detalhes();
}
