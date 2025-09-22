// src/utils/weatherApi.js

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

/**
 * Fetch current weather for a given city.
 * @param {string} city - City name to fetch weather for.
 * @returns {Promise<Object>} - Weather data JSON.
 */
export async function getCurrentWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Error fetching current weather: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getCurrentWeather failed:", error);
    throw error;
  }
}

/**
 * Fetch 5-day / 3-hour forecast for a given city.
 * @param {string} city - City name to fetch forecast for.
 * @returns {Promise<Object>} - Forecast data JSON.
 */
export async function getForecast(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Error fetching forecast: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getForecast failed:", error);
    throw error;
  }
}
