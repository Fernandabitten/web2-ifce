import { BASE_API_URL, fetchComErro } from "../../scripts/api.js";

// Lista de temas disponíveis com seus respectivos ícones e nomes
const themeConfig = {
  dark: { icon: "fas fa-moon", label: "Tema Escuro" },
  light: { icon: "fas fa-sun", label: "Tema Claro" },
  gray: { icon: "fas fa-adjust", label: "Tema Cinza" },
  blue: { icon: "fas fa-droplet", label: "Tema Azul" },
  violet: { icon: "fas fa-star-half-alt", label: "Tema Violeta" },
};

const temasDisponiveis = Object.keys(themeConfig);

// Aplica o tema salvo
const temaSalvo = localStorage.getItem("tema") || "dark";
const temaValido = temasDisponiveis.includes(temaSalvo) ? temaSalvo : "dark";
document.documentElement.classList.add(`theme-${temaValido}`);

export async function ativarHeader(container) {
  // Carrega CSS do header uma única vez
  const cssId = "header-css";
  if (!document.getElementById(cssId)) {
    const link = Object.assign(document.createElement("link"), {
      id: cssId,
      rel: "stylesheet",
      href: "components/header/header.css",
    });
    document.head.appendChild(link);
  }

  // Aguarda o DOM estar pronto
  await new Promise((resolve) => {
    if (document.readyState === "complete") return resolve();
    window.addEventListener("load", resolve);
  });

  const avatar = container.querySelector("#avatar");
  const userMenu = container.querySelector("#user-menu");
  const logoutBtn = container.querySelector("#logout-btn");
  const saudacaoEl = container.querySelector(".user-area strong");
  const editProfileBtn = document.getElementById("edit-profile-btn");
  const toggleThemeBtn = container.querySelector("#toggle-theme-btn");
  const html = document.documentElement;

  if (!avatar || !userMenu || !logoutBtn || !saudacaoEl) return;

  // Saudação com nome do usuário
  try {
    const res = await fetchComErro(`${BASE_API_URL}/me`, {
      method: "GET",
      credentials: "include",
    });
    if (res?.nome) {
      saudacaoEl.textContent = `Olá, ${res.nome}`;
    }
  } catch {
    console.warn("Usuário não autenticado ou erro ao buscar dados");
  }

  // Alternância de exibição do menu
  avatar.addEventListener("click", (e) => {
    e.stopPropagation();
    userMenu.style.display =
      userMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", () => {
    userMenu.style.display = "none";
  });

  userMenu.addEventListener("click", (e) => e.stopPropagation());

  logoutBtn.addEventListener("click", async () => {
    const res = await fetchComErro(
      `${BASE_API_URL}/logout`,
      { method: "POST", credentials: "include" },
      "Erro ao sair"
    );
    if (res !== null) {
      window.location.href = "login.html";
    }
  });

  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
      window.location.href = "pages/profile.html";
    });
  }

  // Atualiza ícone do botão de tema
  function atualizaIconeTema() {
    if (!toggleThemeBtn) return;
    const temaAtual = temasDisponiveis.find((t) =>
      html.classList.contains(`theme-${t}`)
    );
    const tema = themeConfig[temaAtual];
    toggleThemeBtn.innerHTML = `
      <i class="${tema.icon}"></i> ${tema.label}
      <span class="sr-only">Alternar tema</span>
    `;
  }

  atualizaIconeTema();

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", () => {
      const temaAtual = temasDisponiveis.find((t) =>
        html.classList.contains(`theme-${t}`)
      );

      let proximoIndice =
        (temasDisponiveis.indexOf(temaAtual) + 1) % temasDisponiveis.length;
      const novoTema = temasDisponiveis[proximoIndice];

      // Atualiza classes e localStorage
      temasDisponiveis.forEach((t) => html.classList.remove(`theme-${t}`));
      html.classList.add(`theme-${novoTema}`);
      localStorage.setItem("tema", novoTema);

      atualizaIconeTema();
      document.dispatchEvent(new Event("themechange"));
    });
  }
}
