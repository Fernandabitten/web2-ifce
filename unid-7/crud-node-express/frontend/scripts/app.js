const isLocal =
  ["localhost", "127.0.0.1"].includes(window.location.hostname) ||
  window.location.hostname.startsWith("192.168.");

const BASE_API_URL = isLocal
  ? "http://localhost:3000"
  : "https://web2-ifce.onrender.com";

let allMovies = [];
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
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

// Redireciona para edição de perfil
editProfileBtn.addEventListener("click", () => {
  window.location.href = "profile.html";
});

async function fetchMovies() {
  try {
    const response = await fetch(`${BASE_API_URL}/movies`, {
      credentials: "include", // necessário para enviar cookie de sessão
    });

    if (response.status === 401) {
      window.location.href = "login.html";
      return;
    }

    allMovies = await response.json();

    if (!list) return;
    if (allMovies.length === 0) {
      list.innerHTML = "<h1>Nenhum filme/série cadastrado.</h1>";
      return;
    }

    renderMovies(allMovies);
  } catch (error) {
    console.error("Erro ao buscar filmes/séries:", error);
  }
}

function renderMovies(movies) {
  list.innerHTML = "";

  movies.forEach((movie) => {
    const li = document.createElement("section");

    li.innerHTML = `<div class="movie-card">
        <h2>${movie.title}</h2>
        <div class="rating">${getStarsHTML(movie.rating)}</div>
        <p>${movie.description}</p>
        <div class="tags"><span class="tag">${movie.genre}</span></div>
        <div class="actions">
          <button class="edit-button"><a href="new-movie.html?id=${
            movie.id
          }" class="edit">Editar</a></button>
          <button class="delete-button" data-id="${movie.id}">Excluir</button>
        </div>
      </div>`;

    list.appendChild(li);
  });

  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const movieId = button.getAttribute("data-id");
      if (
        confirm(
          "Tem certeza de que deseja excluir? Esta ação não poderá ser desfeita."
        )
      ) {
        await deleteMovie(movieId);
      }
    });
  });
}

async function deleteMovie(id) {
  try {
    const response = await fetch(`${BASE_API_URL}/movie/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      alert("Filme excluído com sucesso!");
      fetchMovies();
    } else {
      alert("Erro ao excluir o filme.");
    }
  } catch (erro) {
    console.error("Erro ao excluir:", erro);
    alert("Erro na requisição.");
  }
}

function getStarsHTML(rating) {
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 === 1;
  const totalStars = 5;
  let starsHTML = "";

  for (let i = 0; i < totalStars; i++) {
    if (i < fullStars) {
      starsHTML += `<svg viewBox="0 0 24 24" class="star full"><path d="M12 2L15.09 8.26L22 9.27L17 14L18.18 20L12 17.77L5.82 20L7 14L2 9.27L8.91 8.26L12 2Z" /></svg>`;
    } else if (i === fullStars && halfStar) {
      starsHTML += `<svg viewBox="0 0 24 24" class="star half"><defs><linearGradient id="halfGradient"><stop offset="50%" stop-color="gold"/><stop offset="50%" stop-color="lightgray"/></linearGradient></defs><path fill="url(#halfGradient)" d="M12 2L15.09 8.26L22 9.27L17 14L18.18 20L12 17.77L5.82 20L7 14L2 9.27L8.91 8.26L12 2Z" /></svg>`;
    } else {
      starsHTML += `<svg viewBox="0 0 24 24" class="star empty"><path d="M12 2L15.09 8.26L22 9.27L17 14L18.18 20L12 17.77L5.82 20L7 14L2 9.27L8.91 8.26L12 2Z" /></svg>`;
    }
  }

  return starsHTML;
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
    renderMovies(filtered);
  });
}

async function logout() {
  await fetch(`${BASE_API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "login.html";
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
showUserName();
fetchMovies();
