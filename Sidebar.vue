<template>
    <aside class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
        <div class="sidebar-header">
            <div class="logo-container">
                <h2 v-if="!isCollapsed">CRM Admin</h2>
                <h2 v-else>CA</h2>
            </div>
            <button class="collapse-btn" @click="$emit('toggle-sidebar')">
                <ChevronLeft v-if="!isCollapsed" />
                <ChevronRight v-else />
            </button>
        </div>

        <div class="sidebar-content">
            <div class="user-profile" v-if="!isCollapsed">
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
                            <span v-if="!isCollapsed">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <Users :size="20" />
                            <span v-if="!isCollapsed">Customers</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <BarChart2 :size="20" />
                            <span v-if="!isCollapsed">Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <ShoppingBag :size="20" />
                            <span v-if="!isCollapsed">Sales</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <MessageSquare :size="20" />
                            <span v-if="!isCollapsed">Messages</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <Map :size="20" />
                            <span v-if="!isCollapsed">Locations</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <Calendar :size="20" />
                            <span v-if="!isCollapsed">Calendar</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <Settings :size="20" />
                            <span v-if="!isCollapsed">Settings</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script setup>
import {
    Home,
    Users,
    BarChart2,
    ShoppingBag,
    MessageSquare,
    Calendar,
    Settings,
    ChevronLeft,
    ChevronRight,
    Map,
} from "lucide-vue-next";

defineProps({
    isCollapsed: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["toggle-sidebar"]);
</script>
