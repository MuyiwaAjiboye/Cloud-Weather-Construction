<template>
  <nav class="navigation">
    <div class="nav-brand">Weather Dashboard</div>
  </nav>
</template>

<style scoped>
.navigation {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-blue);
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-gray);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

.nav-link:hover {
  background-color: var(--bg-white);
}
</style>
