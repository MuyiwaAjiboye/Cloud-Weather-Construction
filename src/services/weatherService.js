import axios from "axios";

const API_KEY = "your_openweather_api_key";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export default {
  async getWeather(lat, lon) {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    return response.data;
  },

  async getAirQuality(lat, lon) {
    const response = await axios.get(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    );
    return response.data;
  },
};
