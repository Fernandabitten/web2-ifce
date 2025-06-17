const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 3000;

// Habilita o CORS para permitir requisições do frontend
app.use(cors());

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// --- Endpoints da API REST ---
app.get("/", (req, res) => {
  res.send("Hello!!!");
});

// Adicionar
app.post("/movie", (req, res) => {
  const { title, genre, rating, description } = req.body;

  // Validação da nota
  if (rating < 0 || rating > 10) {
    return res.status(400).json({ erro: "Nota deve estar entre 0 e 10" });
  }

  const exists = db
    .prepare("SELECT 1 FROM filmes WHERE LOWER(TITLE) = lower(?)")
    .get(title);
  if (exists) {
    return res.status(400).json({ erro: "Filme já cadastrado." });
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO filmes (title, genre, rating, description) VALUES (?, ?, ?, ?)"
    );
    const result = stmt.run(title, genre, rating, description);
    res.status(201).json({
      id: result.lastInsertRowid,
      message: "Filme cadastrado com sucesso!",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editar
app.put("/movie/:id", (req, res) => {
  const { id } = req.params;
  const { title, genre, rating, description } = req.body;

  const movie = db.prepare("SELECT * FROM filmes WHERE id = ?").get(id);
  if (!movie) {
    return res.status(404).json({ message: "Filme não encontrado" });
  }
  db.prepare(
    "UPDATE filmes SET title = ?, genre = ?, rating = ?, description = ? WHERE id = ?"
  ).run(title, genre, rating, description, id);

  res.status(200).json({ message: "Filme atualizado com sucesso" });
});

//Listar
app.get("/movies", (req, res) => {
  try {
    const movies = db.prepare("SELECT * FROM filmes").all();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Deletar
app.delete("/movie/:id", (req, res) => {
  const { id } = req.params;
  const result = db.prepare("DELETE FROM filmes WHERE id = ?").run(id);
  if (result.changes === 0) {
    return res.status(404).json({ message: "Filme não encontrado" });
  }
  res.status(200).json({ message: "Filme removido com sucesso" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
