<template>
  <div class="widget">
    <!-- Header Section -->
    <div class="widget-header">
      <div class="header-content">
        <h2 class="widget-title">Weather Conditions</h2>
        <div class="widget-actions">
          <button class="action-btn" @click="showForecastM = true">Forecast</button>
          <button class="action-btn" @click="showHistoryM = true">History</button>
        </div>
      </div>
    </div>

    <!-- Weather Content Section -->
    <div class="widget-body">
      <div v-if="!weatherData" class="weather-info">Select a project to view weather data</div>
      <div v-else class="weather-info">
        <div class="temperature">{{ Math.round(weatherData.main.temp) }}°C</div>
        <div class="weather-details">
          <div class="stat-item">
            <span class="stat-label">Wind Speed</span>
            <span class="stat-value">{{ weatherData.wind.speed }} m/s</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Conditions</span>
            <span class="stat-value">{{ weatherData.weather[0].description }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Forecast Modal -->
    <div v-if="showForecastM" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>5-Day Forecast</h3>
          <button class="close-btn" @click="showForecastM = false">&times;</button>
        </div>
        <div class="modal-content">
          <div v-if="forecastLoading" class="modal-message">Loading forecast...</div>
          <div v-else-if="!forecastData.length" class="modal-message">
            No forecast data available
          </div>
          <div v-else class="forecast-grid">
            <div v-for="(day, index) in forecastData" :key="index" class="forecast-day">
              <div class="day-header">{{ formatDate(day.dt) }}</div>
              <div class="day-temp">{{ Math.round(day.main.temp) }}°C</div>
              <div class="day-desc">{{ day.weather[0].description }}</div>
              <div class="day-details">
                <div class="detail">
                  <span class="label">Wind</span>
                  <span class="value">{{ day.wind.speed }}m/s</span>
                </div>
                <div class="detail">
                  <span class="label">Humidity</span>
                  <span class="value">{{ day.main.humidity }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- History Modal -->
    <div v-if="showHistoryM" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Historical Weather</h3>
          <button class="close-btn" @click="showHistoryM = false">&times;</button>
        </div>
        <div class="modal-content">
          <div class="date-selector">
            <label for="historyDate">Select Date:</label>
            <input
              type="date"
              id="historyDate"
              v-model="selectedDate"
              :max="today"
              @change="fetchHistoricalWeather"
            />
          </div>

          <div v-if="historyLoading" class="modal-message">Loading historical data...</div>

          <div v-else-if="!historyData" class="modal-message">
            Select a date to view historical weather data
          </div>

          <div v-else class="history-data">
            <div class="history-main">
              <div class="day-temp">{{ Math.round(historyData.main.temp) }}°C</div>
              <div class="day-desc">{{ historyData.weather[0].description }}</div>
            </div>
            <div class="day-details">
              <div class="detail">
                <span class="label">Wind Speed</span>
                <span class="value">{{ historyData.wind.speed }}m/s</span>
              </div>
              <div class="detail">
                <span class="label">Humidity</span>
                <span class="value">{{ historyData.main.humidity }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { getWeather } from '../services/weatherService'
import { format } from 'date-fns'
import { API_KEYS } from '../config/keys'

const showForecastM = ref(false) //for history modal
const showHistoryM = ref(false) //storing historic data
const historyData = ref(null)
const historyLoading = ref(false)
// for date select
const selectedDate = ref(null)

const props = defineProps({
  location: {
    type: Object,
    default: null,
  },
  projectName: {
    type: String,
    default: '',
  },
})

const weatherData = ref(null)
const loading = ref(false)
const error = ref(null)

const forecastData = ref([])
const forecastLoading = ref(false)

const formatDate = (timestamp) => {
  return format(new Date(timestamp * 1000), 'EEE, MMM d')
}

// Weather checks
const isWindSpeedHigh = computed(() => {
  if (!weatherData.value) return false
  const windSpeedMph = weatherData.value.wind.speed * 2.237
  return windSpeedMph > 20
})

const isHeavyRain = computed(() => {
  if (!weatherData.value) return false
  const rainId = weatherData.value.weather[0].id
  return (rainId >= 502 && rainId <= 531) || rainId === 201 || rainId === 202
})

const constructionAlerts = computed(() => {
  const alerts = []
  if (isWindSpeedHigh.value) {
    alerts.push({
      type: 'warning',
      message: 'Wind speed exceeds safe crane operation limit (20 mph)',
    })
  }
  if (isHeavyRain.value) {
    alerts.push({
      type: 'warning',
      message: 'Heavy rain may affect digger and dumper truck operations',
    })
  }
  return alerts
})

const fetchWeatherData = async () => {
  if (!props.location) return

  loading.value = true
  error.value = null

  try {
    const data = await getWeather(props.location.lat, props.location.lng)
    weatherData.value = data
  } catch (err) {
    error.value = 'Failed to load weather data'
  } finally {
    loading.value = false
  }
}

// Watch for location changes
watch(
  () => props.location,
  () => {
    if (props.location) {
      fetchWeatherData()
    } else {
      weatherData.value = null
    }
  },
  { immediate: true },
)

// Function to fetch 5-day forecast
const fetchForecast = async (lat, lon) => {
  forecastLoading.value = true
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEYS.WEATHER_API_KEY}`,
    )
    const data = await response.json()

    // Group forecast by day (we get data every 3 hours)
    const dailyForecasts = data.list.reduce((days, forecast) => {
      const date = new Date(forecast.dt * 1000).toDateString()
      if (!days[date]) {
        days[date] = forecast
      }
      return days
    }, {})

    // Convert to array
    forecastData.value = Object.values(dailyForecasts)
  } catch (error) {
    console.error('Error fetching forecast:', error)
  } finally {
    forecastLoading.value = false
  }
}

// Watch for modal opening
watch(showForecastM, async (isOpen) => {
  if (isOpen && weatherData.value) {
    await fetchForecast(weatherData.value.coord.lat, weatherData.value.coord.lon)
  }
})

//historic weather
const fetchHistoricalWeather = async (lat, lon, date) => {
  try {
    const timestamp = Math.floor(date.getTime() / 1000)
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&dt=${timestamp}&units=metric&appid=${API_KEYS.WEATHER_API_KEY}`,
    )
    const data = await response.json()
    historyData.value = data
  } catch (error) {
    console.error('Error fetching historical data:', error)
  }
}

// Get today's date for max date in date picker
const today = computed(() => {
  const date = new Date()
  return date.toISOString().split('T')[0]
})

// Add click handler to history button
const handleHistoryClick = () => {
  showHistoryM.value = true
  // Default to 7 days ago
  selectedDate.value = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
}

// Fetch historical weather data
const fetchHistoricalWeather = async () => {
  if (!weatherData.value || !selectedDate.value) return

  historyLoading.value = true
  try {
    const timestamp = Math.floor(new Date(selectedDate.value).getTime() / 1000)
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${weatherData.value.coord.lat}&lon=${weatherData.value.coord.lon}&dt=${timestamp}&units=metric&appid=${API_KEYS.WEATHER_API_KEY}`,
    )
    const data = await response.json()
    historyData.value = data
  } catch (error) {
    console.error('Error fetching historical data:', error)
  } finally {
    historyLoading.value = false
  }
}
</script>

<style scoped>
.widget {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
  height: 100%;
}

.widget-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(67, 89, 113, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.widget-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.widget-body {
  padding: 1.5rem;
}

.widget-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #e4e6ef;
  background: white;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: rgba(115, 103, 240, 0.08);
  color: #7367f0;
  border-color: #7367f0;
}

.weather-info {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.temperature {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.weather-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6e6b7b;
}

.stat-value {
  font-weight: 500;
  color: var(--text-primary);
}

.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: slideIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e4e6ef;
}

.modal-content {
  padding: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  color: #6e6b7b;
}

.close-btn:hover {
  color: #ef4444;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* forcast style */
.forecast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.forecast-day {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  text-align: center;
}

.day-header {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.day-temp {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.day-desc {
  color: #6e6b7b;
  margin-bottom: 1rem;
  text-transform: capitalize;
}

.day-details {
  display: grid;
  gap: 0.5rem;
}

.detail {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.modal-message {
  text-align: center;
  padding: 2rem;
  color: #6e6b7b;
}

.label {
  color: #6e6b7b;
}

.value {
  font-weight: 500;
  color: var(--text-primary);
}

/* for historical data content */
.date-selector {
  margin-bottom: 1.5rem;
  text-align: center;
}

.date-selector label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.date-selector input {
  padding: 0.75rem;
  border: 1px solid #e4e6ef;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  width: 200px;
  color: var(--text-primary);
}

.history-data {
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
}

.history-main {
  margin-bottom: 1.5rem;
}

.modal-message {
  text-align: center;
  padding: 2rem;
  color: #6e6b7b;
}
</style>
