<template>
  <div class="widget">
    <div class="widget-header">
      <h2 class="widget-title">Select Project</h2>
    </div>
    <div class="widget-body">
      <div class="select-wrapper">
        <select v-model="selectedProjectId" class="project-select" @change="handleProjectChange">
          <option value="">Select a project</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.name }}
          </option>
        </select>
        <div class="select-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div v-if="selectedProject" class="project-details">
        <div class="detail-item">
          <span class="detail-label">Manager:</span>
          <span class="detail-value">{{ selectedProject.manager }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Location:</span>
          <span class="detail-value">{{ selectedProject.location }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Description:</span>
          <p class="detail-value description">{{ selectedProject.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Complete project data
const projects = ref([
  {
    id: 1,
    name: 'NESST',
    description:
      'A new university building with lab spaces, meeting rooms, breakout areas, kitchen areas and WC facilities.',
    manager: 'Chelsea Dawson',
    location: 'Northumbria University, Ellison Terrace, Newcastle upon Tyne, NE1 8ST',
    coordinates: {
      lat: 54.976414676146824,
      lng: -1.6066366875533187,
    },
  },
  {
    id: 2,
    name: 'CHASE',
    description:
      'A new university building with lab spaces, meeting rooms, breakout areas, kitchen areas and WC facilities.',
    manager: 'Peter Duncan',
    location: 'Northumbria University, Ellison Terrace, Newcastle upon Tyne, NE1 8ST',
    coordinates: {
      lat: 54.97919158255862,
      lng: -1.6064863942439456,
    },
  },
  {
    id: 3,
    name: 'HMRC',
    description:
      'An office space for a public sector client to include gym space, staff rooms with kitchen areas, toilet facilities, meeting rooms and breakout areas.',
    manager: 'Dan Smith',
    location: 'New Bridge Street, Newcastle upon Tyne, NE1 2SW',
    coordinates: {
      lat: 54.97419179801806,
      lng: -1.6113036886189427,
    },
  },
  {
    id: 4,
    name: 'St James Park',
    description:
      'An extension to the existing football stadium to include a clubhouse for coaching non-professional players and hosting events. To include a small field, an exhibition room, toilet facilities and a kitchen.',
    manager: 'Chelsea Dawson',
    location:
      'Newcastle United Football Co Ltd, St. James Park, Strawberry Place, Newcastle upon Tyne, NE1 4ST',
    coordinates: {
      lat: 54.97470900180268,
      lng: -1.6204767255123336,
    },
  },
])

const selectedProjectId = ref('')
const selectedProject = computed(() => projects.value.find((p) => p.id === selectedProjectId.value))

const emit = defineEmits(['project-selected'])

const handleProjectChange = () => {
  emit('project-selected', selectedProject.value)
}
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

.select-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.project-select {
  width: 100%;
  padding: 0.875rem 1rem;
  padding-right: 2.5rem;
  border: 1px solid #e4e6ef;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: var(--text-primary);
  background-color: white;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.15s ease-in-out;
}

.project-select:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.1);
}

.project-select:hover {
  border-color: #ced4da;
}

.select-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6e6b7b;
  pointer-events: none;
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.875rem;
  color: #6e6b7b;
}

.detail-value {
  font-weight: 500;
  color: var(--text-primary);
}

.description {
  line-height: 1.5;
  font-size: 0.875rem;
}

/* Add hover state for details */
.detail-item:hover {
  background-color: rgba(67, 89, 113, 0.04);
  border-radius: 0.375rem;
  padding: 0.5rem;
  margin: -0.5rem;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .widget-body {
    padding: 1rem;
  }

  .project-select {
    font-size: 1rem;
    padding: 0.75rem;
  }
}
</style>
