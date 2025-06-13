const BASE_API_URL = "http://localhost:3000";

let allMovies = [];
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");

async function fetchMovies() {
  try {
    const response = await fetch(`${BASE_API_URL}/movies`);
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

fetchMovies();
