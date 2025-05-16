<template>
  <div class="layout-wrapper">
    <nav class="horizontal-nav">
      <div class="nav-content">
        <div class="nav-brand">
          <span class="brand-text">Weather Dashboard</span>
        </div>
      </div>
    </nav>

    <main class="main-wrapper">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
:root {
  --background-color: #f8f7fa;
  --nav-bg: #ffffff;
  --text-primary: #5d596c;
  --shadow-sm: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
  --primary-color: #7367f0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Public Sans', sans-serif;
  background-color: var(--background-color);
  color: var(--text-primary);
}

.layout-wrapper {
  min-height: 100vh;
}

.horizontal-nav {
  height: 70px;
  background: var(--nav-bg);
  box-shadow: var(--shadow-sm);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
}

.nav-content {
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-logo {
  height: 32px;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: rgba(115, 103, 240, 0.08);
  color: var(--primary-color);
}

.main-wrapper {
  padding-top: 90px;
  padding-inline: 1.5rem;
  max-width: 1440px;
  margin: 0 auto;
}
</style>
