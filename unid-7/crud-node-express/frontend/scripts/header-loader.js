// Carrega header.html e injeta no DOM
fetch("header.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("header-placeholder").innerHTML = html;
    initHeader(); // Inicializa os eventos e avatar
  });

function initHeader() {
  const avatar = document.getElementById("avatar");
  const userMenu = document.getElementById("user-menu");
  const logoutBtn = document.getElementById("logout-btn");
  const editProfileBtn = document.getElementById("edit-profile-btn");

  avatar.addEventListener("click", (e) => {
    e.stopPropagation();
    userMenu.style.display =
      userMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", () => {
    userMenu.style.display = "none";
  });

  userMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  logoutBtn.addEventListener("click", () => {
    fetch(`${BASE_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    }).then(() => {
      window.location.href = "login.html";
    });
  });

  editProfileBtn.addEventListener("click", () => {
    window.location.href = "profile.html";
  });

  // Carrega nome e avatar
  fetch(`${BASE_API_URL}/me`, { credentials: "include" })
    .then((res) => res.json())
    .then((user) => {
      document.querySelector(".user strong").textContent = `Olá, ${user.nome}!`;
      if (user.avatar) {
        avatar.src = user.avatar;
      }
    })
    .catch(() => {
      window.location.href = "login.html";
    });
}
