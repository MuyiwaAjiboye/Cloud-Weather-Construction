<template>
    <div class="card">
        <div class="card-header">
            <h3>Active Customers</h3>
            <button class="btn btn-text">View All</button>
        </div>
        <div class="customers-list">
            <div
                class="customer-item"
                v-for="(customer, index) in activeCustomers"
                :key="index"
            >
                <div class="customer-avatar">
                    <img
                        :src="`/placeholder.svg?height=40&width=40`"
                        :alt="customer.name"
                    />
                </div>
                <div class="customer-details">
                    <h4>{{ customer.name }}</h4>
                    <p>{{ customer.email }}</p>
                </div>
                <div class="customer-status" :class="customer.statusClass">
                    {{ customer.status }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

// Sample data for active customers
const activeCustomers = ref([
    {
        name: "Emma Watson",
        email: "emma@example.com",
        status: "Active",
        statusClass: "status-active",
    },
    {
        name: "James Sullivan",
        email: "james@example.com",
        status: "Inactive",
        statusClass: "status-inactive",
    },
    {
        name: "Thomas Smith",
        email: "thomas@example.com",
        status: "Active",
        statusClass: "status-active",
    },
    {
        name: "Olivia Martinez",
        email: "olivia@example.com",
        status: "Active",
        statusClass: "status-active",
    },
]);
</script>
