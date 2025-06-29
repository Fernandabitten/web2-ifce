const BASE_API_URL =
  ["localhost", "127.0.0.1"].includes(window.location.hostname) ||
  window.location.hostname.startsWith("192.168.")
    ? "http://localhost:3000"
    : "https://web2-ifce.onrender.com";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector('input[type="email"]').value;
  const senha = document.querySelector('input[type="password"]').value;

  try {
    const response = await fetch(`${BASE_API_URL}/login`, {
      method: "POST",
      credentials: "include", // necessário para sessões
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      window.location.href = "index.html";
    } else {
      const erro = await response.json();
      alert("Erro: " + erro.error);
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
    alert("Erro de conexão com o servidor.");
  }
});
