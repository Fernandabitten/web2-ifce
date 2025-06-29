const Database = require("better-sqlite3");
const db = new Database("./filmes.db");

// Cria a tabela se não existir
const createTable = `
  CREATE TABLE IF NOT EXISTS filmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    rating REAL NOT NULL,
    description TEXT,  
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
  )
`;

// Cria a tabela de usuários se não existir
const createUsuariosTable = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    papel TEXT DEFAULT 'user',
    avatar TEXT
  )
`;

// db.exec(`ALTER TABLE usuarios ADD COLUMN nome TEXT NOT NULL DEFAULT ''`);
// db.exec(`UPDATE usuarios SET papel = 'admin' WHERE email = 'admin@email.com'`);
// db.exec(`DELETE FROM usuarios WHERE email = 'maria@gmail.com'`);

db.exec(createTable);
db.exec(createUsuariosTable);

module.exports = db;
