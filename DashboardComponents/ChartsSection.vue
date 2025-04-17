<template>
    <div class="charts-section">
        <div class="chart-card large">
            <div class="card-header">
                <h3>Revenue Overview</h3>
                <div class="card-actions">
                    <select v-model="selectedPeriod">
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
            </div>
            <div class="chart-container">
                <!-- Placeholder for chart -->
                <div class="chart-placeholder">
                    <div class="chart-bars">
                        <div
                            class="chart-bar"
                            v-for="(value, index) in revenueData"
                            :key="index"
                            :style="{ height: `${value}%` }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="chart-card">
            <div class="card-header">
                <h3>Sales by Category</h3>
                <div class="card-actions">
                    <MoreHorizontal :size="18" />
                </div>
            </div>
            <div class="chart-container">
                <!-- Placeholder for pie chart -->
                <div class="pie-chart-placeholder">
                    <div class="pie-segment segment-1"></div>
                    <div class="pie-segment segment-2"></div>
                    <div class="pie-segment segment-3"></div>
                </div>
                <div class="chart-legend">
                    <div class="legend-item">
                        <span class="legend-color bg-primary"></span>
                        <span>Electronics (45%)</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color bg-success"></span>
                        <span>Clothing (30%)</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color bg-warning"></span>
                        <span>Accessories (25%)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { MoreHorizontal } from "lucide-vue-next";

const selectedPeriod = ref("monthly");

// Sample data for revenue chart
const revenueData = ref([65, 40, 80, 55, 95, 70, 45, 75, 60, 50, 80, 75]);
</script>
