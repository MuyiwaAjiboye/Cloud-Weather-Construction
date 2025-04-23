import axios from 'axios'

const API_KEY = '17ed6739832a647507ffdaf131b2b4b5'
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
