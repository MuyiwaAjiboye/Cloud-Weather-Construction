import axios from 'axios'
import { API_KEYS } from '../config/keys'
const API_KEY = API_KEYS.WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: 'metric', // For Celsius
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching weather:', error)
    throw error
  }
}
