const isLocal =
  ["localhost", "127.0.0.1"].includes(window.location.hostname) ||
  window.location.hostname.startsWith("192.168.");

const BASE_API_URL = isLocal
  ? `http://${window.location.hostname}:3000`
  : "https://web2-ifce-filmes-backend.onrender.com";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.querySelector('input[type="text"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const senha = document.querySelector('input[type="password"]').value;

  const response = await fetch(`${BASE_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });

  if (response.ok) {
    alert("Usuário cadastrado com sucesso!");
    window.location.href = "login.html";
  } else {
    const erro = await response.json();
    alert("Erro: " + erro.error);
  }
});
