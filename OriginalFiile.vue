<template>
    <div class="app-container">
        <!-- Sidebar -->

        <aside
            class="sidebar"
            :class="{ 'sidebar-collapsed': isSidebarCollapsed }"
        >
            <div class="sidebar-header">
                <div class="logo-container">
                    <h2 v-if="!isSidebarCollapsed">CRM Admin</h2>

                    <h2 v-else>CA</h2>
                </div>

                <button class="collapse-btn" @click="toggleSidebar">
                    <ChevronLeft v-if="!isSidebarCollapsed" />

                    <ChevronRight v-else />
                </button>
            </div>

            <div class="sidebar-content">
                <div class="user-profile" v-if="!isSidebarCollapsed">
                    <div class="avatar">
                        <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="User Avatar"
                        />
                    </div>

                    <div class="user-info">
                        <h4>John Doe</h4>

                        <p>Administrator</p>
                    </div>
                </div>

                <nav class="sidebar-menu">
                    <ul>
                        <li class="active">
                            <a href="#">
                                <Home :size="20" />

                                <span v-if="!isSidebarCollapsed"
                                    >Dashboard</span
                                >
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <Users :size="20" />

                                <span v-if="!isSidebarCollapsed"
                                    >Customers</span
                                >
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <BarChart2 :size="20" />

                                <span v-if="!isSidebarCollapsed"
                                    >Analytics</span
                                >
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <ShoppingBag :size="20" />

                                <span v-if="!isSidebarCollapsed">Sales</span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <MessageSquare :size="20" />

                                <span v-if="!isSidebarCollapsed">Messages</span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <Map :size="20" />

                                <span v-if="!isSidebarCollapsed"
                                    >Locations</span
                                >
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <Calendar :size="20" />

                                <span v-if="!isSidebarCollapsed">Calendar</span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <Settings :size="20" />

                                <span v-if="!isSidebarCollapsed">Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>

        <!-- Main Content -->

        <main class="main-content">
            <!-- Header -->

            <header class="header">
                <div class="search-container">
                    <Search :size="20" />

                    <input type="text" placeholder="Search..." />
                </div>

                <div class="header-actions">
                    <button class="icon-btn">
                        <Bell :size="20" />

                        <span class="badge">3</span>
                    </button>

                    <button class="icon-btn">
                        <Mail :size="20" />

                        <span class="badge">5</span>
                    </button>

                    <div class="user-dropdown">
                        <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="User Avatar"
                            class="avatar-sm"
                        />
                    </div>
                </div>
            </header>

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

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon bg-primary-light">
                            <DollarSign :size="24" class="text-primary" />
                        </div>

                        <div class="stat-details">
                            <h3>$24,895</h3>

                            <p>Total Revenue</p>

                            <div class="stat-trend positive">
                                <TrendingUp :size="16" />

                                <span>+18.2%</span>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon bg-success-light">
                            <Users :size="24" class="text-success" />
                        </div>

                        <div class="stat-details">
                            <h3>1,482</h3>

                            <p>New Customers</p>

                            <div class="stat-trend positive">
                                <TrendingUp :size="16" />

                                <span>+12.5%</span>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon bg-warning-light">
                            <ShoppingCart :size="24" class="text-warning" />
                        </div>

                        <div class="stat-details">
                            <h3>385</h3>

                            <p>New Orders</p>

                            <div class="stat-trend negative">
                                <TrendingDown :size="16" />

                                <span>-2.4%</span>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon bg-danger-light">
                            <Activity :size="24" class="text-danger" />
                        </div>

                        <div class="stat-details">
                            <h3>89.5%</h3>

                            <p>Conversion Rate</p>

                            <div class="stat-trend positive">
                                <TrendingUp :size="16" />

                                <span>+5.7%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Map Section -->

                <div class="map-section">
                    <div class="card map-card">
                        <div class="card-header">
                            <h3>Customer Locations</h3>

                            <div class="card-actions">
                                <select v-model="selectedMapView">
                                    <option value="all">All Customers</option>

                                    <option value="active">
                                        Active Customers
                                    </option>

                                    <option value="new">New Customers</option>
                                </select>
                            </div>
                        </div>

                        <div class="map-container">
                            <div id="customer-map" ref="mapContainer"></div>

                            <div class="map-legend">
                                <div class="legend-item">
                                    <span class="map-marker active"></span>

                                    <span>Active Customers</span>
                                </div>

                                <div class="legend-item">
                                    <span class="map-marker inactive"></span>

                                    <span>Inactive Customers</span>
                                </div>

                                <div class="legend-item">
                                    <span class="map-marker new"></span>

                                    <span>New Leads</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts Section -->

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
                                    <span
                                        class="legend-color bg-primary"
                                    ></span>

                                    <span>Electronics (45%)</span>
                                </div>

                                <div class="legend-item">
                                    <span
                                        class="legend-color bg-success"
                                    ></span>

                                    <span>Clothing (30%)</span>
                                </div>

                                <div class="legend-item">
                                    <span
                                        class="legend-color bg-warning"
                                    ></span>

                                    <span>Accessories (25%)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Transactions & Customers -->

                <div class="grid-section">
                    <div class="card">
                        <div class="card-header">
                            <h3>Recent Transactions</h3>

                            <button class="btn btn-text">View All</button>
                        </div>

                        <div class="transactions-list">
                            <div
                                class="transaction-item"
                                v-for="(
                                    transaction, index
                                ) in recentTransactions"
                                :key="index"
                            >
                                <div
                                    class="transaction-icon"
                                    :class="transaction.iconBg"
                                >
                                    <component
                                        :is="transaction.icon"
                                        :size="20"
                                        :class="transaction.iconColor"
                                    />
                                </div>

                                <div class="transaction-details">
                                    <h4>{{ transaction.title }}</h4>

                                    <p>{{ transaction.date }}</p>
                                </div>

                                <div
                                    class="transaction-amount"
                                    :class="transaction.amountClass"
                                >
                                    {{ transaction.amount }}
                                </div>
                            </div>
                        </div>
                    </div>

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

                                <div
                                    class="customer-status"
                                    :class="customer.statusClass"
                                >
                                    {{ customer.status }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

import {
    Home,
    Users,
    BarChart2,
    ShoppingBag,
    MessageSquare,
    Calendar,
    Settings,
    Search,
    Bell,
    Mail,
    ChevronLeft,
    ChevronRight,
    Download,
    Plus,
    DollarSign,
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    Activity,
    MoreHorizontal,
    CreditCard,
    RefreshCw,
    Send,
    Map,
} from "lucide-vue-next";

// Import Leaflet

import "leaflet/dist/leaflet.css";

import L from "leaflet";

const isSidebarCollapsed = ref(false);

const selectedPeriod = ref("monthly");

const selectedMapView = ref("all");

const mapContainer = ref(null);

let map = null;

let markers = [];

const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

// Sample data for revenue chart

const revenueData = ref([65, 40, 80, 55, 95, 70, 45, 75, 60, 50, 80, 75]);

// Sample data for recent transactions

const recentTransactions = ref([
    {
        title: "Payment from John Doe",

        date: "Apr 25, 2023 • 12:48 PM",

        amount: "+$850.00",

        icon: CreditCard,

        iconBg: "bg-primary-light",

        iconColor: "text-primary",

        amountClass: "text-success",
    },

    {
        title: "Payment refund to #4832",

        date: "Apr 22, 2023 • 09:25 AM",

        amount: "-$450.00",

        icon: RefreshCw,

        iconBg: "bg-warning-light",

        iconColor: "text-warning",

        amountClass: "text-danger",
    },

    {
        title: "Payment failed from #6755",

        date: "Apr 18, 2023 • 03:16 PM",

        amount: "$605.50",

        icon: CreditCard,

        iconBg: "bg-danger-light",

        iconColor: "text-danger",

        amountClass: "text-muted",
    },

    {
        title: "Subscription payment",

        date: "Apr 12, 2023 • 05:50 PM",

        amount: "+$99.00",

        icon: Send,

        iconBg: "bg-success-light",

        iconColor: "text-success",

        amountClass: "text-success",
    },
]);

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

// Sample data for customer locations

const customerLocations = ref([
    {
        id: 1,

        name: "Emma Watson",

        status: "active",

        lat: 40.7128,

        lng: -74.006,

        revenue: "$5,240",

        lastPurchase: "2 days ago",
    },

    {
        id: 2,

        name: "James Sullivan",

        status: "inactive",

        lat: 34.0522,

        lng: -118.2437,

        revenue: "$1,875",

        lastPurchase: "3 weeks ago",
    },

    {
        id: 3,

        name: "Thomas Smith",

        status: "active",

        lat: 41.8781,

        lng: -87.6298,

        revenue: "$3,690",

        lastPurchase: "5 days ago",
    },

    {
        id: 4,

        name: "Olivia Martinez",

        status: "active",

        lat: 29.7604,

        lng: -95.3698,

        revenue: "$7,120",

        lastPurchase: "1 day ago",
    },

    {
        id: 5,

        name: "Robert Johnson",

        status: "new",

        lat: 37.7749,

        lng: -122.4194,

        revenue: "$0",

        lastPurchase: "Never",
    },

    {
        id: 6,

        name: "Sophia Williams",

        status: "active",

        lat: 39.9526,

        lng: -75.1652,

        revenue: "$2,340",

        lastPurchase: "1 week ago",
    },

    {
        id: 7,

        name: "Michael Brown",

        status: "inactive",

        lat: 33.4484,

        lng: -112.074,

        revenue: "$950",

        lastPurchase: "2 months ago",
    },

    {
        id: 8,

        name: "Emily Davis",

        status: "new",

        lat: 32.7767,

        lng: -96.797,

        revenue: "$125",

        lastPurchase: "Today",
    },
]);

// Initialize map

const initMap = () => {
    // Fix Leaflet icon issue

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",

        shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    // Create map

    map = L.map(mapContainer.value).setView([39.8283, -98.5795], 4);

    // Add tile layer (OpenStreetMap)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

        maxZoom: 18,
    }).addTo(map);

    // Add markers

    addMarkers();
};

// Add markers to map

const addMarkers = () => {
    // Clear existing markers

    markers.forEach((marker) => map.removeLayer(marker));

    markers = [];

    // Filter customers based on selected view

    let filteredCustomers = customerLocations.value;

    if (selectedMapView.value === "active") {
        filteredCustomers = customerLocations.value.filter(
            (customer) => customer.status === "active",
        );
    } else if (selectedMapView.value === "new") {
        filteredCustomers = customerLocations.value.filter(
            (customer) => customer.status === "new",
        );
    }

    // Add markers for filtered customers

    filteredCustomers.forEach((customer) => {
        // Create custom icon based on status

        const iconColor =
            customer.status === "active"
                ? "#28c76f"
                : customer.status === "inactive"
                  ? "#ea5455"
                  : "#ff9f43";

        const customIcon = L.divIcon({
            className: `custom-marker ${customer.status}`,

            html: `<div style="background-color: ${iconColor}"></div>`,

            iconSize: [20, 20],
        });

        // Create marker

        const marker = L.marker([customer.lat, customer.lng], {
            icon: customIcon,
        }).addTo(map);

        // Add popup

        marker.bindPopup(`

      <div class="map-popup">

        <h4>${customer.name}</h4>

        <p><strong>Status:</strong> ${customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}</p>

        <p><strong>Revenue:</strong> ${customer.revenue}</p>

        <p><strong>Last Purchase:</strong> ${customer.lastPurchase}</p>

      </div>

    `);

        markers.push(marker);
    });
};

// Watch for changes in selected map view

watch(selectedMapView, () => {
    if (map) {
        addMarkers();
    }
});

// Initialize map on component mount

onMounted(() => {
    // Use setTimeout to ensure the DOM is fully rendered

    setTimeout(() => {
        initMap();
    }, 100);
});

// Clean up on component unmount

onUnmounted(() => {
    if (map) {
        map.remove();

        map = null;
    }
});
</script>

<style>
/* Base Styles */

:root {
    --primary: #7367f0;

    --primary-light: rgba(115, 103, 240, 0.12);

    --success: #28c76f;

    --success-light: rgba(40, 199, 111, 0.12);

    --warning: #ff9f43;

    --warning-light: rgba(255, 159, 67, 0.12);

    --danger: #ea5455;

    --danger-light: rgba(234, 84, 85, 0.12);

    --dark: #4b4b4b;

    --gray: #6e6b7b;

    --light-gray: #f8f8f8;

    --border-color: #ebe9f1;

    --sidebar-width: 260px;

    --sidebar-collapsed-width: 70px;

    --header-height: 70px;
}

* {
    margin: 0;

    padding: 0;

    box-sizing: border-box;
}

body {
    font-family: "Inter", sans-serif;

    color: var(--dark);

    background-color: #f8f8f8;
}

.app-container {
    display: flex;

    min-height: 100vh;
}

/* Sidebar Styles */

.sidebar {
    width: var(--sidebar-width);

    background-color: white;

    border-right: 1px solid var(--border-color);

    height: 100vh;

    position: fixed;

    transition: width 0.3s ease;

    z-index: 10;
}

.sidebar-collapsed {
    width: var(--sidebar-collapsed-width);
}

.sidebar-header {
    height: var(--header-height);

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding: 0 20px;

    border-bottom: 1px solid var(--border-color);
}

.logo-container h2 {
    color: var(--primary);

    font-size: 1.5rem;
}

.collapse-btn {
    background: none;

    border: none;

    color: var(--gray);

    cursor: pointer;

    display: flex;

    align-items: center;

    justify-content: center;
}

.user-profile {
    display: flex;

    align-items: center;

    padding: 20px;

    border-bottom: 1px solid var(--border-color);
}

.avatar {
    width: 40px;

    height: 40px;

    border-radius: 50%;

    overflow: hidden;

    margin-right: 12px;
}

.avatar img {
    width: 100%;

    height: 100%;

    object-fit: cover;
}

.user-info h4 {
    font-size: 0.9rem;

    margin-bottom: 2px;
}

.user-info p {
    font-size: 0.75rem;

    color: var(--gray);
}

.sidebar-menu {
    padding: 20px 0;
}

.sidebar-menu ul {
    list-style: none;
}

.sidebar-menu li {
    margin-bottom: 5px;
}

.sidebar-menu a {
    display: flex;

    align-items: center;

    padding: 12px 20px;

    color: var(--gray);

    text-decoration: none;

    transition: all 0.3s ease;

    border-radius: 5px;

    margin: 0 10px;
}

.sidebar-menu a:hover {
    background-color: var(--primary-light);

    color: var(--primary);
}

.sidebar-menu li.active a {
    background-color: var(--primary-light);

    color: var(--primary);

    font-weight: 500;
}

.sidebar-menu a span {
    margin-left: 12px;
}

/* Main Content Styles */

.main-content {
    flex: 1;

    margin-left: var(--sidebar-width);

    transition: margin-left 0.3s ease;
}

.sidebar-collapsed + .main-content {
    margin-left: var(--sidebar-collapsed-width);
}

.header {
    height: var(--header-height);

    background-color: white;

    border-bottom: 1px solid var(--border-color);

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding: 0 30px;

    position: sticky;

    top: 0;

    z-index: 5;
}

.search-container {
    display: flex;

    align-items: center;

    background-color: var(--light-gray);

    border-radius: 8px;

    padding: 8px 15px;

    width: 300px;
}

.search-container input {
    border: none;

    background: none;

    outline: none;

    margin-left: 10px;

    width: 100%;
}

.header-actions {
    display: flex;

    align-items: center;

    gap: 15px;
}

.icon-btn {
    background: none;

    border: none;

    position: relative;

    cursor: pointer;

    color: var(--gray);
}

.badge {
    position: absolute;

    top: -5px;

    right: -5px;

    background-color: var(--danger);

    color: white;

    font-size: 0.6rem;

    width: 18px;

    height: 18px;

    border-radius: 50%;

    display: flex;

    align-items: center;

    justify-content: center;
}

.avatar-sm {
    width: 36px;

    height: 36px;

    border-radius: 50%;

    cursor: pointer;
}

/* Dashboard Content Styles */

.dashboard-content {
    padding: 30px;
}

.page-header {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 30px;
}

.page-header h1 {
    font-size: 1.8rem;

    font-weight: 600;
}

.actions {
    display: flex;

    gap: 10px;
}

.btn {
    display: flex;

    align-items: center;

    gap: 8px;

    padding: 8px 16px;

    border-radius: 8px;

    font-weight: 500;

    cursor: pointer;

    transition: all 0.2s ease;

    border: none;
}

.btn-primary {
    background-color: var(--primary);

    color: white;
}

.btn-primary:hover {
    background-color: #635ce0;
}

.btn-outline {
    background-color: transparent;

    border: 1px solid var(--border-color);

    color: var(--dark);
}

.btn-outline:hover {
    background-color: var(--light-gray);
}

.btn-text {
    background: none;

    border: none;

    color: var(--primary);

    padding: 0;

    font-weight: 500;

    cursor: pointer;
}

/* Stats Grid */

.stats-grid {
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 20px;

    margin-bottom: 30px;
}

.stat-card {
    background-color: white;

    border-radius: 10px;

    padding: 20px;

    display: flex;

    align-items: center;

    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.stat-icon {
    width: 50px;

    height: 50px;

    border-radius: 8px;

    display: flex;

    align-items: center;

    justify-content: center;

    margin-right: 15px;
}

.stat-details h3 {
    font-size: 1.5rem;

    font-weight: 600;

    margin-bottom: 5px;
}

.stat-details p {
    color: var(--gray);

    font-size: 0.9rem;

    margin-bottom: 8px;
}

.stat-trend {
    display: flex;

    align-items: center;

    font-size: 0.8rem;

    font-weight: 500;
}

.stat-trend.positive {
    color: var(--success);
}

.stat-trend.negative {
    color: var(--danger);
}

.stat-trend svg {
    margin-right: 4px;
}

/* Map Section */

.map-section {
    margin-bottom: 30px;
}

.map-card {
    background-color: white;

    border-radius: 10px;

    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

    overflow: hidden;
}

.map-container {
    position: relative;

    height: 400px;
}

#customer-map {
    height: 100%;

    width: 100%;

    z-index: 1;
}

.map-legend {
    position: absolute;

    bottom: 20px;

    right: 20px;

    background-color: white;

    padding: 10px;

    border-radius: 8px;

    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    z-index: 2;
}

.map-legend .legend-item {
    display: flex;

    align-items: center;

    margin-bottom: 8px;

    font-size: 0.8rem;
}

.map-legend .legend-item:last-child {
    margin-bottom: 0;
}

.map-marker {
    width: 12px;

    height: 12px;

    border-radius: 50%;

    margin-right: 8px;
}

.map-marker.active {
    background-color: var(--success);
}

.map-marker.inactive {
    background-color: var(--danger);
}

.map-marker.new {
    background-color: var(--warning);
}

/* Custom marker styles for the map */

.custom-marker {
    border-radius: 50%;

    overflow: hidden;
}

.custom-marker div {
    width: 100%;

    height: 100%;

    border-radius: 50%;

    border: 2px solid white;

    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.map-popup {
    padding: 5px;
}

.map-popup h4 {
    margin: 0 0 5px 0;

    font-size: 14px;
}

.map-popup p {
    margin: 3px 0;

    font-size: 12px;
}

/* Charts Section */

.charts-section {
    display: grid;

    grid-template-columns: 2fr 1fr;

    gap: 20px;

    margin-bottom: 30px;
}

.chart-card {
    background-color: white;

    border-radius: 10px;

    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

    overflow: hidden;
}

.card-header {
    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 20px;

    border-bottom: 1px solid var(--border-color);
}

.card-header h3 {
    font-size: 1.1rem;

    font-weight: 600;
}

.card-actions select {
    padding: 6px 10px;

    border-radius: 6px;

    border: 1px solid var(--border-color);

    outline: none;

    font-size: 0.9rem;
}

.chart-container {
    padding: 20px;

    height: 300px;
}

/* Chart Placeholders */

.chart-placeholder {
    height: 100%;

    display: flex;

    align-items: flex-end;

    justify-content: space-between;

    padding-top: 30px;
}

.chart-bars {
    display: flex;

    align-items: flex-end;

    justify-content: space-between;

    width: 100%;

    height: 100%;
}

.chart-bar {
    width: 6%;

    background-color: var(--primary-light);

    border-radius: 4px 4px 0 0;

    position: relative;
}

.chart-bar::after {
    content: "";

    position: absolute;

    bottom: 0;

    left: 0;

    width: 100%;

    height: 30%;

    background-color: var(--primary);

    border-radius: 4px 4px 0 0;
}

.pie-chart-placeholder {
    width: 150px;

    height: 150px;

    border-radius: 50%;

    position: relative;

    margin: 0 auto 20px;

    background-color: #f5f5f5;

    overflow: hidden;
}

.pie-segment {
    position: absolute;

    width: 100%;

    height: 100%;

    transform-origin: center;
}

.segment-1 {
    background-color: var(--primary);

    clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%);
}

.segment-2 {
    background-color: var(--success);

    clip-path: polygon(50% 50%, 0 0, 50% 0);
}

.segment-3 {
    background-color: var(--warning);

    clip-path: polygon(50% 50%, 0 0, 0 100%, 50% 100%);
}

.chart-legend {
    display: flex;

    flex-direction: column;

    gap: 10px;
}

.legend-item {
    display: flex;

    align-items: center;

    font-size: 0.9rem;
}

.legend-color {
    width: 12px;

    height: 12px;

    border-radius: 3px;

    margin-right: 8px;
}

/* Grid Section */

.grid-section {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 20px;
}

.card {
    background-color: white;

    border-radius: 10px;

    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

    overflow: hidden;
}

/* Transactions List */

.transactions-list,
.customers-list {
    padding: 0 20px;
}

.transaction-item,
.customer-item {
    display: flex;

    align-items: center;

    padding: 15px 0;

    border-bottom: 1px solid var(--border-color);
}

.transaction-item:last-child,
.customer-item:last-child {
    border-bottom: none;
}

.transaction-icon {
    width: 40px;

    height: 40px;

    border-radius: 8px;

    display: flex;

    align-items: center;

    justify-content: center;

    margin-right: 15px;
}

.transaction-details,
.customer-details {
    flex: 1;
}

.transaction-details h4,
.customer-details h4 {
    font-size: 0.95rem;

    font-weight: 500;

    margin-bottom: 3px;
}

.transaction-details p,
.customer-details p {
    font-size: 0.8rem;

    color: var(--gray);
}

.transaction-amount {
    font-weight: 600;

    font-size: 0.95rem;
}

.text-success {
    color: var(--success);
}

.text-danger {
    color: var(--danger);
}

.text-warning {
    color: var(--warning);
}

.text-primary {
    color: var(--primary);
}

.text-muted {
    color: var(--gray);
}

.bg-primary-light {
    background-color: var(--primary-light);
}

.bg-success-light {
    background-color: var(--success-light);
}

.bg-warning-light {
    background-color: var(--warning-light);
}

.bg-danger-light {
    background-color: var(--danger-light);
}

.bg-primary {
    background-color: var(--primary);
}

.bg-success {
    background-color: var(--success);
}

.bg-warning {
    background-color: var(--warning);
}

.bg-danger {
    background-color: var(--danger);
}

/* Customer Status */

.customer-avatar {
    width: 40px;

    height: 40px;

    border-radius: 50%;

    overflow: hidden;

    margin-right: 15px;
}

.customer-status {
    font-size: 0.8rem;

    font-weight: 500;

    padding: 4px 10px;

    border-radius: 20px;
}

.status-active {
    background-color: var(--success-light);

    color: var(--success);
}

.status-inactive {
    background-color: var(--danger-light);

    color: var(--danger);
}

/* Responsive Styles */

@media (max-width: 1200px) {
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .charts-section {
        grid-template-columns: 1fr;
    }

    .grid-section {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .sidebar {
        width: var(--sidebar-collapsed-width);
    }

    .main-content {
        margin-left: var(--sidebar-collapsed-width);
    }

    .search-container {
        width: 200px;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }
}
</style>
