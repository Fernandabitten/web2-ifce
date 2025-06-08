const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Bem-vindo à minha API 2!");
});

// Rota produto
// Exemplo: http://localhost:5000/produto?id=1
// Retorna detalhes do produto com base no ID fornecido
app.get("/produto", (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).send("ID do produto é obrigatório");
  }

  const idNum = Number(id);
  if (isNaN(idNum)) {
    return res.status(400).send("ID deve ser um número");
  }
  if (id === "1") {
    return res.json({
      nome: "Mouse",
      preco: 100.0,
    });
  } else if (id === "2") {
    return res.json({
      nome: "Teclado",
      preco: 200.0,
    });
  } else {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor is running on http://localhost:${PORT}`);
});
