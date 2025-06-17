const Database = require("better-sqlite3");
const db = new Database("./filmes.db");

// Cria a tabela se não existir
const createTable = `
  CREATE TABLE IF NOT EXISTS filmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    rating REAL NOT NULL,
    description TEXT
  )
`;

db.exec(createTable);

module.exports = db;
