// arquivo principal que orquestra tudo.

import {
  cityInput,
  pastDateInput,
  travelButton,
  loadingIndicator,
  weatherDisplay,
  modalCloseButton,
  messageModal,
} from "./domSelectors.js";
import {
  showModal,
  clearCards,
  displayCurrentWeather,
  displayPastWeather,
  displayFutureWeather,
} from "./ui.js";
import { getCoordinates, fetchCityImage, fetchWeather } from "./api.js";

// ============================
// Eventos Botões
// ============================
travelButton.addEventListener("click", fetchWeatherData);
modalCloseButton.addEventListener("click", () =>
  messageModal.classList.remove("show")
);

// ============================
// Funções Principais
// ============================
// Função para obter dados meteorológicos da cidade
async function fetchWeatherData() {
  const city = cityInput.value.trim();
  const pastDate = pastDateInput.value;

  if (!city) {
    showModal("Erro", "Por favor, insira o nome de uma cidade.");
    return;
  }

  if (!pastDate) {
    showModal("Erro", "Por favor, selecione uma data passada.");
    return;
  }

  loadingIndicator.classList.remove("hidden");
  weatherDisplay.classList.remove("grid"); // Esconder os cards enquanto carrega

  try {
    const coords = await getCoordinates(city);
    console.log("Coordenadas obtidas:", coords);
    if (!coords) {
      loadingIndicator.classList.add("hidden");
      weatherDisplay.classList.add("grid");
      return;
    }
    const { latitude, longitude, display_name } = coords;

    clearCards(); // Limpar os cards antes de exibir os novos

    // Busca imagens para os cards
    const [currentImageUrl, pastImageUrl, futureImageUrl] = await Promise.all([
      fetchCityImage(city),
      fetchCityImage(city, 1),
      fetchCityImage(city, 2),
    ]);

    // Fetch Clima Atual
    const currentData = await fetchWeather(latitude, longitude);
    displayCurrentWeather(currentData, display_name, currentImageUrl);

    // Fetch Tempo Passado
    const pastData = await fetchWeather(latitude, longitude, pastDate);
    displayPastWeather(pastData, display_name, pastDate, pastImageUrl);

    // Fetch Clima Futuro
    const futureData = await fetchWeather(latitude, longitude);
    displayFutureWeather(futureData, display_name, futureImageUrl);
  } catch (error) {
    console.error("Erro geral ao buscar dados:", error);
    showModal(
      "Erro",
      `Não foi possível buscar os dados meteorológicos. Detalhes: ${
        error.message || error
      }.`
    );
  } finally {
    loadingIndicator.classList.add("hidden");
    weatherDisplay.classList.add("grid");
  }
}

// ============================
// Inicialização
// ============================
window.onload = () => {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  pastDateInput.value = oneYearAgo.toISOString().split("T")[0];

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 2);
  pastDateInput.max = yesterday.toISOString().split("T")[0];
};
