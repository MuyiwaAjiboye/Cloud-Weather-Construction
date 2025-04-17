<template>
  <div class="app">
    <Navigation />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>

<style>
:root {
  --primary-blue: #60a5fa;
  --secondary-blue: #93c5fd;
  --accent-yellow: #fcd34d;
  --bg-white: #f8fafc;
  --text-gray: #475569;
}

.app {
  min-height: 100vh;
  background-color: var(--bg-white);
  color: var(--text-gray);
}
</style>
