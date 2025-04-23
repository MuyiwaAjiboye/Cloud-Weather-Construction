<template>
  <div class="widget">
    <div class="widget-header">
      <h2 class="widget-title">Weather Conditions</h2>
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
            ⚠️ {{ alert.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getWeather } from '../services/weatherService'

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
}

.widget-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-primary);
}

.widget-body {
  padding: 1.5rem;
}

.weather-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.temperature {
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  color: var(--text-primary);
}

.weather-details {
  display: grid;
  gap: 0.75rem;
}

.detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-danger {
  color: #dc2626;
}

.alerts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.alert {
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.alert.warning {
  background-color: #fef3c7;
  color: #92400e;
}

.loading,
.error,
.no-location {
  text-align: center;
  padding: 2rem;
  color: var(--text-primary);
}

.project-location {
  text-align: center;
  color: var(--text-primary);
  font-weight: 500;
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
</style>
