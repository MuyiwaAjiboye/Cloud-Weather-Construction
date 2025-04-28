<template>
  <div class="widget">
    <div class="widget-header">
      <div class="header-content">
        <h2 class="widget-title">Weather Conditions</h2>
        <div class="widget-actions">
          <button class="action-btn" @click="showForecastM = true">Forecast</button>
          <button class="action-btn" @click="showHistory = true">History</button>
        </div>
      </div>
    </div>
    <div class="widget-body">
      <!-- No Project Selected State -->
      <div v-if="!location" class="no-location">
        Please select a project to view weather conditions
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="loading">Loading weather data..</div>

      <!-- Error State -->
      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <!-- Weather Data -->
      <div v-else-if="weatherData" class="weather-info">
        <div class="project-location">
          {{ projectName }}
        </div>

        <div class="temperature">{{ Math.round(weatherData.main.temp) }}°C</div>

        <div class="weather-details">
          <div class="stat-item">
            <span class="stat-label">Wind Speed</span>
            <span class="stat-value" :class="{ 'text-danger': isWindSpeedHigh }">
              {{ weatherData.wind.speed }} m/s
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Conditions</span>
            <span class="stat-value">
              {{ weatherData.weather[0].description }}
            </span>
          </div>
        </div>

        <!-- Construction Alerts -->
        <div v-if="constructionAlerts.length" class="alerts">
          <div
            v-for="(alert, index) in constructionAlerts"
            :key="index"
            class="alert"
            :class="alert.type"
          >
            {{ alert.message }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showForecastModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h3>8-Day Forecast</h3>
        <button class="close-btn" @click="showForecastM = false">&times;</button>
      </div>
      <div class="modal-content">
        <!-- Forecast content will go here -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getWeather } from '../services/weatherService'

const showForecastM = ref(false)
const showHistoryM = ref(false)
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

// Weather checks remain the same...
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
</style>
