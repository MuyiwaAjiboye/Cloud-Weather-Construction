<template>
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
</template>

<script setup>
import { Search, Bell, Mail } from "lucide-vue-next";
</script>
