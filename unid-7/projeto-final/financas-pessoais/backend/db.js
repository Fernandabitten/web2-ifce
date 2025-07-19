// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database("./banco.db");

// // Criação das tabelas se não existirem
// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       nome TEXT NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       senha TEXT NOT NULL
//     )
//   `);

//   db.run(`
//     CREATE TABLE IF NOT EXISTS transactions (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       user_id INTEGER NOT NULL,
//       tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida')),
//       valor REAL NOT NULL CHECK (valor >= 0),
//       categoria TEXT NOT NULL,
//       descricao TEXT,
//       data TEXT NOT NULL,
//       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//     )
//   `);
// });

// module.exports = db;

const Database = require("better-sqlite3");
const db = new Database("./banco.db", { verbose: console.log });

// Criação das tabelas se não existirem
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida')),
    valor REAL NOT NULL CHECK (valor >= 0),
    categoria TEXT NOT NULL,
    descricao TEXT,
    data TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

module.exports = db;
