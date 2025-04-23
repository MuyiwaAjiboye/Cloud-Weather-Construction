<template>
  <div class="widget">
    <div class="widget-header">
      <h2 class="widget-title">Project Locations</h2>
    </div>
    <div class="widget-body">
      <div id="map" ref="mapContainer" class="map-container"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import mapboxgl from 'mapbox-gl'

const mapContainer = ref(null)
const props = defineProps({
  location: {
    type: Object,
    default: () => null,
  },
})

onMounted(() => {
  // Initialize map
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-1.6177, 54.9783], // Newcastle coordinates
    zoom: 13,
    accessToken:
      'pk.eyJ1IjoiZG90dW4wOCIsImEiOiJjbTlzcnV0czUwMnpqMmtyM3R2dG85bXAwIn0.o8UJe0rZIbfocIVr6Q02jw',
  })

  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl())

  // Add markers when map loads
  map.on('load', () => {
    const projects = [
      {
        name: 'NESST',
        coordinates: [-1.6066366875533187, 54.976414676146824],
      },
      {
        name: 'CHASE',
        coordinates: [-1.6064863942439456, 54.97919158255862],
      },
      {
        name: 'HMRC',
        coordinates: [-1.6113036886189427, 54.97419179801806],
      },
      {
        name: 'St James Park',
        coordinates: [-1.6204767255123336, 54.97470900180268],
      },
    ]

    // Add markers for each project
    projects.forEach((project) => {
      new mapboxgl.Marker({ color: '#2563eb' })
        .setLngLat(project.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${project.name}</h3>`))
        .addTo(map)
    })
  })

  // Watch for location changes
  watch(
    () => props.location,
    (newLocation) => {
      if (newLocation && map) {
        map.flyTo({
          center: [newLocation.lng, newLocation.lat],
          zoom: 15,
          duration: 1500,
        })
      }
    },
  )
})
</script>

<style>
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
  padding: 0;
  height: calc(100% - 70px);
}

.map-container {
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  overflow: hidden;
}

/* Make sure Mapbox controls are visible */
.mapboxgl-control-container {
  display: block !important;
}
</style>
