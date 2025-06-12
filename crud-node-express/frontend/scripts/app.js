const BASE_API_URL = "http://localhost:3000";

const list = document.getElementById("list");
const saveButton = document.getElementById("saveButton");

// Busca lista de filmes/séries
async function fetchMovies() {
  try {
    const response = await fetch(`${BASE_API_URL}/movies`);
    const movies = await response.json();
    if (!list) {
      console.warn("Elemento com id='list' não encontrado.");
      return;
    }
    if (movies.length === 0) {
      list.innerHTML = "<p>Nenhum filme/série cadastrado ainda.</p>";
      return;
    }
    renderMovies(movies);
  } catch (error) {
    console.error("Erro ao buscar filmes/séries:", error);
  }
}

if (saveButton) {
  saveButton.addEventListener("click", function () {
    // Captura dos valores
    const title = document.getElementById("title").value;
    const rating = parseFloat(document.getElementById("rating").value);
    const description = document.getElementById("description").value;
    const genreSelect = document.querySelector(".new-marker");
    const genre = genreSelect.value;

    // Validação básica
    if (
      !title ||
      isNaN(rating) ||
      rating < 0 ||
      rating > 10 ||
      !genre ||
      genre === "Selecione um gênero"
    ) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const movieData = {
      title,
      rating,
      description,
      genre,
    };

    console.log(movieData);
    addMovie(movieData);
  });
}

async function addMovie(movieData) {
  try {
    const response = await fetch(`${BASE_API_URL}/movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });

    if (response.ok) {
      alert("Filme cadastrado com sucesso!");
      // Redireciona pra home
      window.location.href = "index.html"; // ou resetar campos
    } else {
      const error = await response.json();
      alert(`Erro ao cadastrar: ${error.message}`);
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
    alert("Erro na requisição.");
  }
}

// --- Funções de Renderização e UI ---
function renderMovies(movies) {
  list.innerHTML = "";
  movies.forEach((movie) => {
    const li = document.createElement("section");
    li.innerHTML = `<div class="movie-card">
        <h2>${movie.title}</h2>
        <div class="rating">
          ${getStarsHTML(movie.rating)} 
        </div>
        <p>${movie.description}</p>
        <div class="tags">
          <span class="tag">${movie.genre}</span>
         </div>
        <div class="actions">
          <button class="edit-button"><a href="new-movie.html" class="edit">Editar</a></button>
          <button class="delete-button">Excluir</button>
        </div>
      </div>
    `;
    list.appendChild(li);
  });
}

function getStarsHTML(rating) {
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 === 1;
  const totalStars = 5;
  let starsHTML = "";

  for (let i = 0; i < totalStars; i++) {
    if (i < fullStars) {
      starsHTML += `
        <svg viewBox="0 0 24 24" class="star full">
          <path d="M12 2L15.09 8.26L22 9.27L17 14L18.18 20L12 17.77L5.82 20L7 14L2 9.27L8.91 8.26L12 2Z" />
        </svg>`;
    } else if (i === fullStars && halfStar) {
      starsHTML += `
        <svg viewBox="0 0 24 24" class="star half">
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stop-color="gold"/>
              <stop offset="50%" stop-color="lightgray"/>
            </linearGradient>
          </defs>
          <path fill="url(#halfGradient)" d="M12 2L15.09 8.26L22 9.27L17 14L18.18 20L12 17.77L5.82 20L7 14L2 9.27L8.91 8.26L12 2Z" />
        </svg>`;
    } else {
      starsHTML += `
        <svg viewBox="0 0 24 24" class="star empty">
          <path d="M12 2L15.09 8.26L22 9.27L17 14L18.18 20L12 17.77L5.82 20L7 14L2 9.27L8.91 8.26L12 2Z" />
        </svg>`;
    }
  }

  return starsHTML;
}

fetchMovies();
