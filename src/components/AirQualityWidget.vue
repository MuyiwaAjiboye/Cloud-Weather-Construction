<template>
  <div class="widget">
    <div class="widget-header">
      <h2 class="widget-title">Air Quality</h2>
    </div>
    <div class="widget-body">
      <!-- when no project is Selected -->
      <div v-if="!location" class="air-quality-info">Select a project to view the air quality</div>

      <!-- Loading -->
      <div v-else-if="loading" class="air-quality-info">Loading...</div>

      <!-- Air Quality Data -->
      <div v-else class="air-quality-info">
        <!-- Big AQI Number -->
        <div
          class="aqi-main"
          :class="{
            'text-success': isGoodAirQuality,
            'text-danger': !isGoodAirQuality,
          }"
        >
          {{ airQualityText }}
        </div>

        <!-- status and recommendation part -->
        <div class="aqi-details">
          <div class="stat-item">
            <span class="stat-label">Status</span>
            <span
              class="stat-value"
              :class="{
                'text-success': isGoodAirQuality,
                'text-danger': !isGoodAirQuality,
              }"
            >
              //if else
              {{ isGoodAirQuality ? 'Safe for Operations' : 'Operation Not Advised' }}
            </span>
          </div>
        </div>

        <!-- recommendationn message -->
        <div class="recommendation" v-if="recommendationMessage">
          {{ recommendationMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getAirQuality } from '../services/airQualityService'

// Props
const props = defineProps({
  location: {
    type: Object,
    default: null,
  },
})

// initialize data
const loading = ref(false)
const airQualityData = ref(null)

// Get air quality data using our service
const fetchAirQuality = async () => {
  if (!props.location) return

  loading.value = true

  try {
    const data = await getAirQuality(props.location.lat, props.location.lng)
    airQualityData.value = data.list[0]
  } catch (error) {
    console.error('Error fetching air quality:', error)
  } finally {
    loading.value = false
  }
}

// converting aqi number to text
const airQualityText = computed(() => {
  if (!airQualityData.value) return 'Unknown'

  const aqi = airQualityData.value.main.aqi
  const levels = {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor',
  }
  return levels[aqi] || 'Unknown'
})

// chhecking if air quality is good 1 or fair 2
const isGoodAirQuality = computed(() => {
  if (!airQualityData.value) return false
  return airQualityData.value.main.aqi <= 2
})

// get recommendation depending on air quality
const recommendationMessage = computed(() => {
  if (!airQualityData.value) return '' //nothing

  return isGoodAirQuality.value
    ? 'Safe to carry out work with earth moving equipment'
    : 'Earth moving equipment operations not recommended due to air quality'
})

// here to watch for location changes and if there was a change then update the data
watch(
  () => props.location,
  () => {
    if (props.location) {
      fetchAirQuality()
    } else {
      airQualityData.value = null
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

.air-quality-info {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.aqi-main {
  font-size: 2.5rem;
  font-weight: 600;
}

.aqi-details {
  display: grid;
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
}

.recommendation {
  font-size: 0.875rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background-color: #f3f4f6;
}

.text-success {
  color: #10b981;
}

.text-danger {
  color: #ef4444;
}
</style>
