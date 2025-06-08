const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Bem-vindo à minha API 3!");
});

// Rota para saudação com nome
// Exemplo: http://localhost:3000/saudacao/João
app.get("/saudacao/:nome", (req, res) => {
  const nome = req.params.nome;

  const nomeFormatado = nome
    .toLowerCase()
    .split(" ")
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");

  res.send(`Olá, ${nomeFormatado}`);
});

// Rota para calcular a soma de dois números
// Exemplo: http://localhost:3000/soma?a=5&b=10
app.get("/soma", (req, res) => {
  const { a, b } = req.query;
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  if (isNaN(numA) || isNaN(numB)) {
    return res
      .status(400)
      .send('Parâmetros inválidos. Certifique-se que "a" e "b" são números.');
  }
  const resultado = numA + numB;
  res.json({
    resultado: resultado,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
