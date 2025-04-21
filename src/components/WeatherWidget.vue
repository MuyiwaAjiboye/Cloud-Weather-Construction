<template>
  <div class="widget">
    <div class="widget-header">
      <h2 class="widget-title">Weather Conditions</h2>
    </div>
    <div class="widget-body">
      <div class="weather-info">
        <div class="weather-primary">
          <span class="temperature">24°</span>
          <span class="weather-desc">Partly Cloudy</span>
        </div>
        <div class="weather-stats">
          <div class="stat-item">
            <span class="stat-label">Wind Speed</span>
            <span class="stat-value">15 mph</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Humidity</span>
            <span class="stat-value">65%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<style scoped>
.widget {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
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

.weather-primary {
  text-align: center;
}

.temperature {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.weather-desc {
  display: block;
  color: #6e6b7b;
  margin-top: 0.5rem;
}

.weather-stats {
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
