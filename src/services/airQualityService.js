import axios from 'axios'
import { API_KEYS } from '../config/keys'
const API_KEY = API_KEYS.WEATHER_API_KEY
const BASE_URL = 'http://api.openweathermap.org/data/2.5'

export const getAirQuality = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/air_pollution`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching air quality:', error)
    throw error
  }
}
