<template>
    <div class="widget weather-widget">
        <h3>Weather Conditions</h3>
        <div v-if="weatherData">
            <div class="weather-info">
                <span class="temperature">{{ weatherData.temp }}°C</span>
                <span class="wind">Wind: {{ weatherData.windSpeed }} mph</span>
            </div>
            <div class="alerts" v-if="alerts.length">
                <div v-for="alert in alerts" :key="alert" class="alert">
                    {{ alert }}
                </div>
            </div>
        </div>
    </div>
</template>
