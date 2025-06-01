// contem as funções relacionadas à interface do usuário (UI)
import {
  weatherCardTemplate,
  messageModal,
  modalTitle,
  modalMessage,
  weatherDisplay,
} from "./domSelectors.js";
import { weatherCodes } from "./constants.js";

export function fillCard(type, data) {
  const container = weatherDisplay;
  const template = weatherCardTemplate;

  if (!template) {
    console.error("Template de card não encontrado.");
    return;
  }

  // Clona o card modelo
  const card = template.cloneNode(true);
  card.classList.remove("hidden");
  card.setAttribute("data-type", type);

  // Popula os dados
  card.querySelector(".title").textContent = data.title;
  card.querySelector(".location").textContent = data.location;
  card.querySelector(".date").textContent = data.date;
  card.querySelector(".weather-icon").innerHTML = data.icon;
  card.querySelector(".temp").textContent = data.temp;
  card.querySelector(".conditions").textContent = data.conditions;
  card.querySelector(".extra1").textContent = data.extra1;
  card.querySelector(".extra2").textContent = data.extra2;

  // A imagem será preenchida aqui
  const imgDiv = card.querySelector(".card-image-section");
  if (imgDiv) {
    imgDiv.style.backgroundImage = data.urlImg;
  }

  // Adiciona no container
  container.appendChild(card);
}

export function clearCards() {
  const cards = document.querySelectorAll(".weather-card:not(.hidden)");
  cards.forEach((card) => card.remove());
}

export function showModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  messageModal.classList.add("show");
}

export function formatDateToBrazil(dateString) {
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Funções de display de clima
export function displayCurrentWeather(data, cityDisplayName, imageUrl) {
  if (data && data.current) {
    const {
      temperature_2m,
      relative_humidity_2m,
      weather_code,
      wind_speed_10m,
    } = data.current;
    const weatherInfo = weatherCodes[weather_code] || {
      emoji: "❓",
      description: "Desconhecido",
    };

    const dados = {
      urlImg: imageUrl ? `url('${imageUrl}')` : "none",
      title: "Clima Atual",
      icon: weatherInfo.emoji,
      location: cityDisplayName,
      date: new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      temp: `${temperature_2m}°C`,
      conditions: weatherInfo.description,
      extra1: `Umidade: ${relative_humidity_2m}%`,
      extra2: `Vento: ${wind_speed_10m} km/h`,
    };
    const type = "current";
    fillCard(type, dados);
  } else {
    showModal(
      "Dados Atuais",
      `Não foi possível obter dados atuais para ${cityDisplayName}.`
    );
  }
}

export function displayPastWeather(data, cityDisplayName, date, imageUrl) {
  console.log("Exibindo clima passado dados:", data);
  if (data && data.daily && data.daily.time && data.daily.time.length > 0) {
    const daily = data.daily;
    const index = daily.time.indexOf(date);

    if (index !== -1) {
      const maxTemp = daily.temperature_2m_max[index];
      const minTemp = daily.temperature_2m_min[index];
      const weatherCode = daily.weather_code[index];
      const precipitation = daily.precipitation_sum[index];

      const weatherInfo = weatherCodes[weatherCode] || {
        emoji: "❓",
        description: "Desconhecido",
      };

      const dados = {
        urlImg: imageUrl ? `url('${imageUrl}')` : "none",
        title: "Clima Passado",
        icon: weatherInfo.emoji,
        location: cityDisplayName,
        date: formatDateToBrazil(date),
        temp: `${minTemp}°C - ${maxTemp}°C`,
        conditions: weatherInfo.description,
        extra1: `Precipitação: ${precipitation} mm`,
        extra2: "",
      };
      const type = "past";
      fillCard(type, dados);
    } else {
      showModal(
        "Dados Passados",
        `Não há dados históricos para a data ${date} em ${cityDisplayName}.`
      );
    }
  } else {
    showModal(
      "Dados Passados",
      `Não foi possível obter dados históricos para ${cityDisplayName} na data selecionada.`
    );
  }
}

export function displayFutureWeather(data, cityDisplayName, imageUrl) {
  if (data && data.daily && data.daily.time && data.daily.time.length > 0) {
    const daily = data.daily;
    const firstForecastIndex = 1; // Próximo dia

    const date = daily.time[firstForecastIndex];
    const maxTemp = daily.temperature_2m_max[firstForecastIndex];
    const minTemp = daily.temperature_2m_min[firstForecastIndex];
    const weatherCode = daily.weather_code[firstForecastIndex];
    const precipitation = daily.precipitation_sum[firstForecastIndex];

    const weatherInfo = weatherCodes[weatherCode] || {
      emoji: "❓",
      description: "Desconhecido",
    };

    const dados = {
      urlImg: imageUrl ? `url('${imageUrl}')` : "none",
      title: "Previsão Futura",
      icon: weatherInfo.emoji,
      location: cityDisplayName,
      date: formatDateToBrazil(date),
      temp: `${minTemp}°C - ${maxTemp}°C`,
      conditions: weatherInfo.description,
      extra1: `Precipitação: ${precipitation} mm`,
      extra2: "",
    };
    const type = "future";
    fillCard(type, dados);
  } else {
    showModal(
      "Previsão Futura",
      `Não foi possível obter previsão futura para ${cityDisplayName}.`
    );
  }
}
