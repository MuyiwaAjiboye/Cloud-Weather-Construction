<template>
  <div class="dashboard">
    <div class="grid-wrapper">
      <div class="select-project-container">
        <SelectProject @project-selected="handleProjectSelect" />
      </div>
      <div class="fixed-height-widget">
        <WeatherWidget :location="selectedLocation" :project-name="selectedProject?.name" />
      </div>
      <div class="fixed-height-widget">
        <AirQualityWidget :location="selectedLocation" />
      </div>
    </div>

    <!-- Full-width map below -->
    <div class="full-width-map">
      <MapWidget :location="selectedLocation" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WeatherWidget from '../components/WeatherWidget.vue'
import AirQualityWidget from '../components/AirQualityWidget.vue'
import MapWidget from '../components/MapWidget.vue'
import SelectProject from '../components/SelectProject.vue'

const selectedLocation = ref(null)

const handleProjectSelect = (project) => {
  if (project) {
    selectedLocation.value = project.coordinates
  } else {
    selectedLocation.value = null
  }
}
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
  align-items: start;
  margin-bottom: 1.5rem;
}

.select-project-container {
  height: fit-content;
}

.fixed-height-widget {
  height: 300px;
}

.full-width-map {
  height: 400px;
  margin-top: 1.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
