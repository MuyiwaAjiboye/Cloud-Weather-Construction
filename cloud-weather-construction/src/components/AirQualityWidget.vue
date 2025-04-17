<template>
    <div class="widget air-quality-widget">
        <h3>Air Quality Index</h3>
        <div class="aqi-value">{{ aqiData.value }}</div>
        <div class="aqi-status">{{ aqiData.status }}</div>
        <div class="recommendation" v-if="recommendation">
            {{ recommendation }}
        </div>
    </div>
</template>
