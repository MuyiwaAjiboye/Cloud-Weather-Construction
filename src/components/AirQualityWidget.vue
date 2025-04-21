<template>
  <div class="air-quality-widget widget">
    <div class="widget-header">
      <h2 class="widget-title">Air Quality</h2>
    </div>
    <div class="widget-body">
      <div class="aqi-content">
        <div class="aqi-main">
          <div
            class="aqi-percentage"
            :class="{ 'text-success': aqiValue > 20, 'text-danger': aqiValue <= 20 }"
          >
            {{ aqiValue }}%
          </div>
          <div class="aqi-status">{{ aqiStatus }}</div>
        </div>

        <div class="aqi-stats">
          <div class="stat-item">
            <span class="stat-label">Status</span>
            <span class="stat-value">Safe for Operations</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">PM2.5</span>
            <span class="stat-value">35 µg/m³</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const aqiValue = ref(75) // Example value
const aqiStatus = ref('Good')
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

.aqi-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.aqi-main {
  text-align: center;
}

.aqi-percentage {
  font-size: 2.5rem;
  font-weight: 600;
}

.text-success {
  color: #28c76f;
}

.text-danger {
  color: #ea5455;
}

.aqi-status {
  color: #6e6b7b;
  margin-top: 0.5rem;
}

.aqi-stats {
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
