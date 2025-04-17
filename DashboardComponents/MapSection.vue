<template>
    <div class="map-section">
        <div class="card map-card">
            <div class="card-header">
                <h3>Customer Locations</h3>
                <div class="card-actions">
                    <select v-model="selectedMapView">
                        <option value="all">All Customers</option>
                        <option value="active">Active Customers</option>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

// Import Leaflet
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const selectedMapView = ref("all");
const mapContainer = ref(null);
let map = null;
let markers = [];

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
