<template>
  <div class="widget">
    <div class="widget-header">
      <h2 class="widget-title">Project Locations</h2>
    </div>
    <div class="widget-body">
      <div id="map" class="map-container"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Replace with your Mapbox access token
mapboxgl.accessToken =
  'pk.eyJ1IjoiZG90dW4wOCIsImEiOiJjbTlzcnV0czUwMnpqMmtyM3R2dG85bXAwIn0.o8UJe0rZIbfocIVr6Q02jw'

const props = defineProps({
  location: {
    type: Object,
    default: () => null,
  },
})

// Default center on Newcastle
const defaultCenter = [-1.6177, 54.9783]

let map = null

onMounted(() => {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11', // Clean, light style
    center: defaultCenter,
    zoom: 13,
  })

  // Add zoom and rotation controls
  map.addControl(new mapboxgl.NavigationControl(), 'top-right')

  // Add all project markers
  const projects = [
    {
      name: 'NESST',
      coordinates: [54.976414676146824, -1.6066366875533187],
    },
    {
      name: 'CHASE',
      coordinates: [54.97919158255862, -1.6064863942439456],
    },
    {
      name: 'HMRC',
      coordinates: [54.97419179801806, -1.6113036886189427],
    },
    {
      name: 'St James Park',
      coordinates: [54.97470900180268, -1.6204767255123336],
    },
  ]

  projects.forEach((project) => {
    const marker = new mapboxgl.Marker({
      color: '#2563eb', // Clean blue color
      scale: 0.8,
    })
      .setLngLat([project.coordinates[1], project.coordinates[0]])
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${project.name}</h3>`))
      .addTo(map)
  })
})

// Watch for location changes to center map
watch(
  () => props.location,
  (newLocation) => {
    if (newLocation && map) {
      map.flyTo({
        center: [newLocation.lng, newLocation.lat],
        zoom: 15,
        duration: 1500, // Smooth animation
        essential: true,
      })
    }
  },
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

.map-container {
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  overflow: hidden;
}

:deep(.mapboxgl-popup) {
  max-width: 200px;
}

:deep(.mapboxgl-popup-content) {
  padding: 10px;
  border-radius: 6px;
}

:deep(.mapboxgl-popup-content h3) {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}
</style>
