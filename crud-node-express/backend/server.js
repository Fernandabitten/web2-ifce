const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Habilita o CORS para permitir requisições do frontend
app.use(cors());
// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Array para armazenar os filmes/séries em memória
let movies = [];

// Contador para gerar IDs automáticos
let nextId = 1;

// --- Endpoints da API REST ---
app.get("/", (req, res) => {
  res.send("Hello!!!");
});

// Adicionar
app.post("/movie", (req, res) => {
  const { title, genre, rating, description } = req.body;

  // Verifica se o filme já está cadastrado (sem distinguir maiúsculas/minúsculas)
  const jaCadastrado = movies.find(
    (movie) => movie.title.toLowerCase() === title.toLowerCase()
  );

  if (jaCadastrado) {
    return res.status(400).json({ erro: "Filme já cadastrado." });
  }

  // Validação da nota
  if (rating < 0 || rating > 10) {
    return res.status(400).json({ erro: "Nota deve estar entre 0 e 10" });
  }

  // Criação e armazenamento do novo item
  const novoItem = { id: nextId++, title, genre, rating, description };
  movies.push(novoItem);

  // Retorno de sucesso
  res.status(201).json(novoItem);
});

// Editar
app.put("/movie/:id", (req, res) => {
  const { id } = req.params;
  const { title, genre, rating, description } = req.body;

  const movie = movies.find((m) => String(m.id) === String(id));
  if (!movie) {
    return res.status(404).json({ message: "Filme não encontrado" });
  }

  movie.title = title;
  movie.rating = rating;
  movie.description = description;
  movie.genre = genre;

  res.status(200).json({ message: "Filme atualizado com sucesso" });
});

//Listar
app.get("/movies", (req, res) => {
  res.send(movies);
});

//Deletar
app.delete("/movie/:id", (req, res) => {
  const { id } = req.params;
  const index = movies.findIndex((movie) => String(movie.id) === String(id));
  if (index === -1) {
    return res.status(404).json({ message: "Filme não encontrado" });
  }
  movies.splice(index, 1);
  res.status(200).json({ message: "Filme removido com sucesso" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
