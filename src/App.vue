<template>
  <div class="app">
    <Navigation />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>

<style>
:root {
  --primary-blue: #60a5fa; /* Light blue for weather */
  --secondary-blue: #93c5fd; /* Lighter blue */
  --accent-yellow: #fcd34d; /* Sunny weather */
  --bg-white: #f8fafc; /* Background */
  --text-gray: #475569; /* Text color */
}

.app {
  min-height: 100vh;
  background-color: var(--bg-white);
  color: var(--text-gray);
}

.main-content {
  padding: 2rem;
}
</style>
