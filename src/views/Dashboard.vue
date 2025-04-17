<template>
    <div class="dashboard-container">
        <ProjectList
            :projects="projects"
            @select-project="handleProjectSelect"
        />

        <div class="main-content">
            <div v-if="selectedProject" class="widget-grid">
                <WeatherWidget
                    :location="selectedProject.location"
                    @weather-alert="handleWeatherAlert"
                />
                <AirQualityWidget
                    :location="selectedProject.location"
                    @air-quality-alert="handleAirQualityAlert"
                />
                <MapWidget :location="selectedProject.location" />
            </div>
        </div>
    </div>
</template>
