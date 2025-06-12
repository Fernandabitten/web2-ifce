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
  res.send("Helow!!!");
});

// Adicionar
app.post("/movie", (req, res) => {
  const { title, genre, rating, description } = req.body;

  if (rating < 0 || rating > 10) {
    return res.status(400).json({ erro: "Nota deve estar entre 0 e 10" });
  }

  const novoItem = { id: nextId++, title, genre, rating, description };
  movies.push(novoItem);
  res.status(201).json(novoItem);
});

//Listar
app.get("/movies", (req, res) => {
  res.send(movies);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
