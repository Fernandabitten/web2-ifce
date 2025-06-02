// contem as funções de interação com APIs externas.

import { showModal } from "./ui.js"; // Importa showModal

// Define a variável, mesmo que não exista chave para evitar parar o fluxo do código
const UNSPLASH_KEY =
  typeof UNSPLASH_API_KEY !== "undefined" ? UNSPLASH_API_KEY : "";

// Busca as coordenadas da cidade usando a Open-Meteo Geocoding API
export async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=pt&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Erro na API de Geocodificação da Open-Meteo:",
        response.status,
        errorText
      );
      throw new Error(
        `Erro na API de Geocodificação da Open-Meteo: ${response.status}`
      );
    }

    const data = await response.json();

    // A API de Geocodificação da Open-Meteo retorna os resultados em 'data.results'
    if (data && data.results && data.results.length > 0) {
      const firstResult = data.results[0]; // Pega o primeiro e mais relevante resultado
      return {
        latitude: parseFloat(firstResult.latitude),
        longitude: parseFloat(firstResult.longitude),
        display_name:
          firstResult.name +
          (firstResult.country
            ? `, ${firstResult.admin1} - ${firstResult.country}`
            : ""), // Constrói um nome mais completo
      };
    } else {
      // Nenhum resultado encontrado para a cidade
      showModal(
        "Cidade Não Encontrada",
        `Não foi possível encontrar coordenadas para a cidade "${city}". Verifique a digitação ou tente uma cidade diferente.`
      );
      return null;
    }
  } catch (error) {
    console.error(
      "Erro ao buscar coordenadas com Open-Meteo Geocoding:",
      error
    );
    showModal(
      "Erro de Coordenadas",
      `Ocorreu um problema ao buscar as coordenadas para "${city}". Tente novamente mais tarde.`
    );
    return null;
  }
}

// Busca as imagens da cidade usando a Unsplash API
export async function fetchCityImage(query, index = 0, quantity = 3) {
  if (!UNSPLASH_KEY || UNSPLASH_KEY === "SUA_CHAVE_DA_UNSPLASH_AQUI") {
    console.warn(
      "Chave da Unsplash API não configurada. As imagens de fundo não serão carregadas."
    );
    return null;
  }

  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${quantity}&client_id=${UNSPLASH_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro na API da Unsplash:", response.status, errorText);
      return null;
    }
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      return data.results[index].urls.regular;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar imagem da Unsplash:", error);
    return null;
  }
}

// Busca os dados do clima usando a Open Meteo API
export async function fetchWeather(latitude, longitude, date = null) {
  let url;
  if (date) {
    url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&timezone=auto`;
  } else {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&forecast_days=7&timezone=auto`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status} ao buscar dados do clima`);
  }
  return await response.json();
}
