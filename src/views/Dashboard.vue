<template>
  <div class="dashboard">
    <h1 class="page-title">Weather Dashboard</h1>

    <div class="grid-wrapper">
      <WeatherWidget />
      <AirQualityWidget />
    </div>
  </div>
</template>

<script setup>
import WeatherWidget from '../components/WeatherWidget.vue'
import AirQualityWidget from '../components/AirQualityWidget.vue'
</script>

<style scoped>
.dashboard {
  padding: 1.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>
