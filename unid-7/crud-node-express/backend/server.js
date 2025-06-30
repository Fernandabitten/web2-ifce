const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./database");
const fileUpload = require("express-fileupload");
const supabase = require("./supabaseClient");
const path = require("path");

const app = express();
const PORT = 3000;

// adiciona suporte a upload de arquivos
app.use(fileUpload());

// Habilita o CORS para permitir requisições do frontend
// app.use(cors());
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "https://fernandabitten.github.io", // para produção
];

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    // origin: function (origin, callback) {
    //   if (!origin || allowedOrigins.includes(origin)) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error("Não permitido pelo CORS"));
    //   }
    // },
    credentials: true, // permite cookies/sessão
  })
);

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

app.use(
  session({
    secret: "segredo-super-seguro",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // true em produção com HTTPS
  })
);

// --- Endpoints da API REST ---
app.get("/", (req, res) => {
  res.send("Hello!!!");
});

// Cadastro - usuário
app.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);

  try {
    const stmt = db.prepare(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)"
    );
    const result = stmt.run(nome, email, hash);
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (err) {
    res.status(400).json({ error: "Email já em uso" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const user = db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email);
  if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

  const match = await bcrypt.compare(senha, user.senha);
  if (!match) return res.status(401).json({ error: "Senha incorreta" });

  // Salva sessão
  req.session.usuario = {
    id: user.id,
    nome: user.nome,
    email: user.email,
    papel: user.papel,
    avatar: user.avatar,
  };
  res.json({ message: "Login bem-sucedidoooo" });
});

app.get("/me", autenticar, (req, res) => {
  res.json(req.session.usuario);
});

function autenticar(req, res, next) {
  if (!req.session.usuario) {
    return res.status(401).json({ error: "Não autenticado" });
  }
  next();
}

function autorizarAdmin(req, res, next) {
  if (req.session.usuario?.papel !== "admin") {
    return res.status(403).json({ error: "Apenas admins podem deletar" });
  }
  next();
}

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logout realizado com sucesso" });
});

// Adicionar
app.post("/movie", autenticar, (req, res) => {
  const { title, genre, rating, description } = req.body;
  const id_usuario = req.session.usuario.id;

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
      "INSERT INTO filmes (title, genre, rating, description, id_usuario) VALUES (?, ?, ?, ?, ?)"
    );
    const result = stmt.run(title, genre, rating, description, id_usuario);
    res.status(201).json({
      id: result.lastInsertRowid,
      message: "Filme cadastrado com sucesso!",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editar
app.put("/movie/:id", autenticar, (req, res) => {
  const { id } = req.params;
  const { title, genre, rating, description } = req.body;
  const id_usuario = req.session.usuario.id;
  const papel = req.session.usuario.papel;

  const movie = db.prepare("SELECT * FROM filmes WHERE id = ?").get(id);
  if (!movie) {
    return res.status(404).json({ message: "Filme não encontrado" });
  }
  // Só pode editar se for o dono ou admin
  if (movie.id_usuario !== id_usuario && papel !== "admin") {
    return res
      .status(403)
      .json({ error: "Apenas o dono ou admin podem editar" });
  }
  db.prepare(
    "UPDATE filmes SET title = ?, genre = ?, rating = ?, description = ? WHERE id = ?"
  ).run(title, genre, rating, description, id);
  res.status(200).json({ message: "Filme atualizado com sucesso" });
});

//Listar filmes do usuario logado, exceto se for admin
app.get("/movies", autenticar, (req, res) => {
  try {
    let movies;
    if (req.session.usuario.papel === "admin") {
      // Admin vê tudo
      movies = db.prepare("SELECT * FROM filmes").all();
    } else {
      // Usuário comum vê só os seus
      movies = db
        .prepare("SELECT * FROM filmes WHERE id_usuario = ?")
        .all(req.session.usuario.id);
    }
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Deletar
app.delete("/movie/:id", autenticar, (req, res) => {
  const { id } = req.params;
  const id_usuario = req.session.usuario.id;
  const papel = req.session.usuario.papel;

  const movie = db.prepare("SELECT * FROM filmes WHERE id = ?").get(id);
  if (!movie) {
    return res.status(404).json({ message: "Filme não encontrado" });
  }
  // Só pode deletar se for o dono ou admin
  if (movie.id_usuario !== id_usuario && papel !== "admin") {
    return res
      .status(403)
      .json({ error: "Apenas o dono ou admin podem deletar" });
  }
  const result = db.prepare("DELETE FROM filmes WHERE id = ?").run(id);
  if (result.changes === 0) {
    return res.status(404).json({ message: "Filme não encontrado" });
  }
  res.status(200).json({ message: "Filme removido com sucesso" });
});

// rota para atualizar perfil (nome, senha, imagem)
app.post("/atualizar-perfil", autenticar, async (req, res) => {
  try {
    const id = req.session.usuario.id;
    const { nome, senhaAtual, novaSenha } = req.body;

    let avatarUrl = null;
    const campos = [];
    const valores = [];

    // 📷 Se veio uma nova imagem
    if (req.files?.avatar) {
      // 🧽 Remove imagem antiga
      const avatarAntigo = req.session.usuario.avatar;
      if (avatarAntigo) {
        const caminhoAntigo = avatarAntigo.split("/").slice(-2).join("/"); // ex: avatars/user_1_172522.jpg
        await supabase.storage.from("perfil").remove([caminhoAntigo]);
      }

      // 📤 Upload da nova
      const avatarFile = req.files.avatar;
      const ext = path.extname(avatarFile.name);
      const fileName = `user_${id}_${Date.now()}${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("perfil")
        .upload(`avatars/${fileName}`, avatarFile.data, {
          contentType: avatarFile.mimetype,
          upsert: true,
        });

      if (uploadError) {
        console.error("Erro no upload do avatar:", uploadError.message);
        return res.status(500).json({ error: "Erro ao salvar imagem" });
      }

      const { data } = supabase.storage
        .from("perfil")
        .getPublicUrl(`avatars/${fileName}`);
      avatarUrl = data.publicUrl;

      campos.push("avatar = ?");
      valores.push(avatarUrl);
    }

    // 🧑 Nome
    if (nome) {
      campos.push("nome = ?");
      valores.push(nome);
    }

    // 🔒 Senha
    if (senhaAtual && novaSenha) {
      const user = db.prepare("SELECT * FROM usuarios WHERE id = ?").get(id);
      const match = await bcrypt.compare(senhaAtual, user.senha);
      if (!match)
        return res.status(401).json({ error: "Senha atual incorreta" });

      const hash = await bcrypt.hash(novaSenha, 10);
      campos.push("senha = ?");
      valores.push(hash);
    }

    if (campos.length === 0) {
      return res.status(400).json({ error: "Nenhuma alteração enviada" });
    }

    const sql = `UPDATE usuarios SET ${campos.join(", ")} WHERE id = ?`;
    valores.push(id);
    db.prepare(sql).run(...valores);

    // 🔄 Atualiza a sessão
    if (nome) req.session.usuario.nome = nome;
    if (avatarUrl) req.session.usuario.avatar = avatarUrl;

    res.json({ message: "Perfil atualizado com sucesso", avatar: avatarUrl });
  } catch (err) {
    console.error("Erro ao atualizar perfil:", err);
    res.status(500).json({ error: "Erro interno ao atualizar perfil" });
  }
});
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
