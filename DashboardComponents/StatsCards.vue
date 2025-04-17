<template>
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
</template>

<script setup>
import {
    DollarSign,
    Users,
    ShoppingCart,
    Activity,
    TrendingUp,
    TrendingDown,
} from "lucide-vue-next";
</script>
