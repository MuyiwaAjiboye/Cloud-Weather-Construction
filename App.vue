<template>
  <div class="app-container">
    <!-- Sidebar -->
    <Sidebar
      :is-collapsed="isSidebarCollapsed"
      @toggle-sidebar="toggleSidebar"
    />

    <!-- Main Content -->
    <main class="main-content" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <!-- Header -->
      <Header />

      <!-- Dashboard Content -->
      <div class="dashboard-content">
        <div class="page-header">
          <h1>CRM Dashboard</h1>
          <div class="actions">
            <button class="btn btn-outline">
              <Download :size="16" />
              Export
            </button>
            <button class="btn btn-primary">
              <Plus :size="16" />
              Add Customer
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <StatsCards />

        <!-- Map Section -->
        <MapSection />

        <!-- Charts Section -->
        <ChartsSection />

        <!-- Recent Transactions & Customers -->
        <div class="grid-section">
          <TransactionsList />
          <CustomersList />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Download, Plus } from 'lucide-vue-next'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import StatsCards from './components/dashboard/StatsCards.vue'
import MapSection from './components/dashboard/MapSection.vue'
import ChartsSection from './components/dashboard/ChartsSection.vue'
import TransactionsList from './components/dashboard/TransactionsList.vue'
import CustomersList from './components/dashboard/CustomersList.vue'

const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<style>
@import './assets/css/base.css';
@import './assets/css/layout.css';
@import './assets/css/components.css';
@import './assets/css/responsive.css';
</style>
