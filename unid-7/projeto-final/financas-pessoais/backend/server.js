// Importações principais
const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

// Rotas
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionsRoutes");

// Inicialização
const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

// Verificação de variáveis obrigatórias
if (!process.env.SESSION_SECRET) {
  console.error("Erro: SESSION_SECRET não definido.");
  process.exit(1);
}

// Middlewares
app.use(express.json());

// CORS configurado com origens permitidas
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "https://fernandabitten.github.io",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origem não permitida pelo CORS"));
    },
    credentials: true,
  })
);

// Sessão
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    },
  })
);

// Rotas
app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});

app.use(authRoutes);
app.use(transactionRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
