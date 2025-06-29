const isLocal =
  ["localhost", "127.0.0.1"].includes(window.location.hostname) ||
  window.location.hostname.startsWith("192.168.");

const BASE_API_URL = isLocal
  ? "http://localhost:3000"
  : "https://web2-ifce.onrender.com";

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const saveButton = document.getElementById("saveButton");
const title = document.getElementById("title-pg");
title.textContent = movieId ? "Editar Filme" : "Novo filme";
const msg = document.getElementById("message");
const avatar = document.getElementById("avatar");
const userMenu = document.getElementById("user-menu");
const logoutBtn = document.getElementById("logout-btn");
const editProfileBtn = document.getElementById("edit-profile-btn");

// Alterna a exibição do menu ao clicar no avatar
avatar.addEventListener("click", (e) => {
  e.stopPropagation();
  userMenu.style.display =
    userMenu.style.display === "block" ? "none" : "block";
});

// Fecha o menu ao clicar fora dele
document.addEventListener("click", () => {
  userMenu.style.display = "none";
});

// Impede que clique dentro do menu feche ele
userMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Função de logout
logoutBtn.addEventListener("click", () => {
  logout(); // Chame sua função de logout normalmente
});

if (movieId) {
  fetch(`${BASE_API_URL}/movies`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((movies) => {
      const movie = movies.find((m) => String(m.id) === movieId);
      if (movie) {
        document.getElementById("title").value = movie.title;
        document.getElementById("rating").value = movie.rating;
        document.getElementById("description").value = movie.description;
        document.querySelector(".new-marker").value = movie.genre;
      }
    });
}

function formatTitle(text) {
  if (!text) return "";

  const lowercaseWords = [
    "de",
    "da",
    "do",
    "das",
    "dos",
    "e",
    "em",
    "a",
    "o",
    "as",
    "os",
    "com",
    "sem",
    "por",
  ];

  return text
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (index !== 0 && lowercaseWords.includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

if (saveButton) {
  saveButton.addEventListener("click", async function () {
    const title = formatTitle(document.getElementById("title").value.trim());
    const rating = parseInt(document.getElementById("rating").value, 10);
    const description = document.getElementById("description").value;
    const genre = document.querySelector(".new-marker").value;

    if (
      !title ||
      isNaN(rating) ||
      rating < 0 ||
      rating > 10 ||
      !Number.isInteger(rating) ||
      !genre ||
      genre === "Selecione um gênero"
    ) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const movieData = { title, rating, description, genre };

    try {
      // Buscar todos os filmes cadastrados
      const response = await fetch(`${BASE_API_URL}/movies`, {
        credentials: "include",
      });
      const movies = await response.json();

      // Normalizar o título atual para comparação
      const normalizedTitle = title.toLowerCase().trim();

      // Verificar se já existe um filme com esse título
      const titleExists = movies.some((movie) => {
        const movieTitle = movie.title.toLowerCase().trim();
        const isSameTitle = movieTitle === normalizedTitle;

        // Se for edição, ignorar o próprio filme
        const isSameMovie = String(movie.id) === movieId;

        return isSameTitle && !isSameMovie;
      });

      if (titleExists) {
        alert("Já existe um filme com esse título.");
        return;
      }

      // Enviar para API (add ou edit)
      if (movieId) {
        editMovie(movieData);
      } else {
        addMovie(movieData);
      }
    } catch (error) {
      console.error("Erro ao verificar títulos existentes:", error);
      alert("Erro ao verificar títulos existentes.");
    }
  });
}

async function addMovie(movieData) {
  try {
    const response = await fetch(`${BASE_API_URL}/movie`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData),
      credentials: "include",
    });

    if (response.ok) {
      msg.textContent = "Filme cadastrado com sucesso!";
      window.location.href = "index.html";
    } else {
      const error = await response.json();
      alert(`Erro ao cadastrar: ${error.message}`);
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
    alert("Erro na requisição.");
  }
}

async function editMovie(movieData) {
  try {
    const response = await fetch(`${BASE_API_URL}/movie/${movieId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData),
      credentials: "include",
    });

    if (response.ok) {
      msg.textContent = "Filme atualizado com sucesso!";
      window.location.href = "index.html";
    } else {
      const error = await response.json();
      alert(`Erro ao atualizar: ${error.message}`);
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
    alert("Erro na requisição.");
  }
}

document.querySelector(".delete-button").addEventListener("click", function () {
  const confirmar = confirm(
    "Tem certeza que deseja cancelar? As informações preenchidas serão perdidas."
  );
  if (confirmar) {
    window.location.href = "index.html";
  }
});

function capitalizeFirstLetter(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function capitalizeName(name) {
  if (!name) return "";

  const preposicoes = ["da", "de", "do", "das", "dos", "e"];

  return name
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      // A primeira palavra deve sempre ser capitalizada, mesmo se for uma preposição
      if (index === 0 || !preposicoes.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    })
    .join(" ");
}

async function showUserName() {
  try {
    const response = await fetch(`${BASE_API_URL}/me`, {
      credentials: "include",
    });
    if (response.ok) {
      const user = await response.json();
      const nomeFormatado = capitalizeName(user.nome);
      document.querySelector(
        ".user strong"
      ).textContent = `Olá, ${nomeFormatado}!`;
      // Atualiza imagem do avatar se tiver
      if (user.avatar) {
        avatar.src = user.avatar;
      }
    }
  } catch (error) {
    // Se não estiver logado, redireciona para login
    window.location.href = "login.html";
  }
}

// Redireciona para edição de perfil
editProfileBtn.addEventListener("click", () => {
  window.location.href = "profile.html";
});

showUserName();
