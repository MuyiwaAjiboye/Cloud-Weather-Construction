<template>
  <div class="widget">
    <div class="widget-header">
      <h2 class="widget-title">Project Locations</h2>
    </div>
    <div class="widget-body">
      <!-- Map container for Vue to track -->
      <div id="map" ref="mapContainer" class="map-container"></div>
    </div>
  </div>
</template>

<script setup>
// import  Vue features and Mapbox
import { onMounted, watch, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import { API_KEYS } from '../config/keys'

// Create a reference for the map container
const mapContainer = ref(null)

// Define props with type checking for location data
const props = defineProps({
  location: {
    type: Object,
    default: () => null,
  },
})

// runs when component is mounted to the DOM
onMounted(() => {
  // InitMapbox map
  const map = new mapboxgl.Map({
    container: 'map', //  container div id
    style: 'mapbox://styles/mapbox/light-v10', // Map style to use
    center: [-1.6177, 54.9783], // Starting position
    zoom: 13, // Starting zoom level
    accessToken: API_KEYS.MAPBOX_TOKEN,
  })

  // Add zoom in and out controls to the map
  map.addControl(new mapboxgl.NavigationControl())

  // Wait for map to finish loading before adding markers
  map.on('load', () => {
    // Array of project locations
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

    // marker for each project location
    projects.forEach((project) => {
      new mapboxgl.Marker({ color: '#2563eb' }) // blue marker
        .setLngLat(project.coordinates) // Set marker position
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${project.name}</h3>`)) // Add popup with project name
        .addTo(map) // Add marker to map
    })
  })

  // Watch for changes in the location
  watch(
    () => props.location,
    (newLocation) => {
      if (newLocation && map) {
        // Animate map to new location when selected
        map.flyTo({
          center: [newLocation.lng, newLocation.lat],
          zoom: 15,
          duration: 1500, // Animation duration in milliseconds
        })
      }
    },
  )
})
</script>

<style>
/* Styling widget container */
.widget {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
  height: 100%;
}

/* Styling widget header */
.widget-header {
  padding: 1.25rem 1.5rem;
}

.widget-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-primary);
}

/* Styling for map container */
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

/* make Mapbox controls visible */
.mapboxgl-control-container {
  display: block !important;
}
</style>
