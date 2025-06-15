const isLocal =
  ["localhost", "127.0.0.1"].includes(window.location.hostname) ||
  window.location.hostname.startsWith("192.168.");

const BASE_API_URL = isLocal
  ? "http://localhost:3000"
  : "https://web2-ifce.onrender.com";

const saveButton = document.getElementById("saveButton");

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

if (movieId) {
  fetch(`${BASE_API_URL}/movies`)
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

  const lowercaseWords = ["de", "da", "do", "das", "dos", "e", "em", "a", "o", "as", "os", "com", "sem", "por"];

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
    const rating = parseFloat(document.getElementById("rating").value);
    const description = document.getElementById("description").value;
    const genre = document.querySelector(".new-marker").value;

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

    const movieData = { title, rating, description, genre };

    try {
      // Buscar todos os filmes cadastrados
      const response = await fetch(`${BASE_API_URL}/movies`);
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
    });

    if (response.ok) {
      alert("Filme cadastrado com sucesso!");
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
    });

    if (response.ok) {
      alert("Filme atualizado com sucesso!");
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