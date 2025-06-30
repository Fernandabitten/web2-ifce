const isLocal =
  ["localhost", "127.0.0.1"].includes(window.location.hostname) ||
  window.location.hostname.startsWith("192.168.");

const BASE_API_URL = isLocal
  ? `http://${window.location.hostname}:3000`
  : "https://web2-ifce-filmes-backend.onrender.com";

const fileInput = document.getElementById("fileInput");
const avatar = document.getElementById("avatar");
const form = document.querySelector(".form");
const inputNome = form.children[0];
const inputEmail = form.children[1];
const inputSenhaAtual = form.children[2];
const inputNovaSenha = form.children[3];

async function carregarPerfil() {
  try {
    const res = await fetch(`${BASE_API_URL}/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      window.location.href = "login.html";
      return;
    }

    const user = await res.json();
    inputNome.value = user.nome;
    inputEmail.value = user.email;
    inputEmail.disabled = true;

    avatar.src = user.avatar || "./img/avatar.png"; // mostra o avatar salvo
  } catch (err) {
    alert("Erro ao carregar perfil");
    console.error(err);
  }
}

carregarPerfil();

// 2. Atualiza preview da imagem
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatar.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// 3. Envia atualização de perfil
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = inputNome.value;
  const senhaAtual = inputSenhaAtual.value;
  const novaSenha = inputNovaSenha.value;
  const avatarFile = fileInput.files[0];

  const formData = new FormData();
  formData.append("nome", nome);
  if (senhaAtual) formData.append("senhaAtual", senhaAtual);
  if (novaSenha) formData.append("novaSenha", novaSenha);
  if (avatarFile) formData.append("avatar", avatarFile);

  try {
    const res = await fetch(`${BASE_API_URL}/atualizar-perfil`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok) {
      alert("Perfil atualizado com sucesso!");
      window.location.href = "index.html";
      if (data.avatar) {
        avatar.src = data.avatar;
      }
      inputSenhaAtual.value = "";
      inputNovaSenha.value = "";
    } else {
      alert("Erro: " + (data.error || "Falha na atualização."));
    }
  } catch (err) {
    alert("Erro ao enviar dados.");
    console.error(err);
  }
});
