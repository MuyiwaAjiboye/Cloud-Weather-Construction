import axios from 'axios'

const API_KEY = '17ed6739832a647507ffdaf131b2b4b5'
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
