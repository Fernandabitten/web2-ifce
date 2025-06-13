const BASE_API_URL = "https://web2-ifce.onrender.com";
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

if (saveButton) {
  saveButton.addEventListener("click", function () {
    const title = document.getElementById("title").value;
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

    if (movieId) {
      editMovie(movieData);
    } else {
      addMovie(movieData);
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
