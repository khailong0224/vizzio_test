<script setup lang="ts">
import { ref } from 'vue'
import type { CommonData, DashboardMeta } from '../../types/dashboard'
import DashboardIcon from '../shared/DashboardIcon.vue'
defineProps<{ labels: CommonData['controls']; page: DashboardMeta; weatherTitle: string; zoom: number; daylight: number }>()
defineEmits<{ zoomIn: []; zoomOut: []; reset: []; daylight: [value: number] }>()
const weatherOpen = ref(false)
</script>

<template>
  <aside class="scene-controls" :aria-label="labels.brightness">
    <button class="scene-button weather-button" :aria-expanded="weatherOpen" aria-controls="weather-snapshot" @click="weatherOpen = !weatherOpen"><DashboardIcon name="sun" /><span>{{ labels.weather }}</span></button>
    <div v-if="weatherOpen" id="weather-snapshot" class="weather-snapshot" role="status"><strong>{{ weatherTitle }}</strong><span>{{ page.header.temperature }}</span><span>{{ page.header.date }}</span></div>
    <div class="daylight-control flex flex-col items-center"><DashboardIcon name="sun" /><input type="range" min="50" max="150" step="5" :value="daylight" :aria-label="labels.brightness" @input="$emit('daylight', Number(($event.target as HTMLInputElement).value))" /><DashboardIcon name="moon" /></div>
    <button class="scene-button" :aria-label="labels.zoomIn" :title="labels.zoomIn" :disabled="zoom >= 1.75" @click="$emit('zoomIn')"><DashboardIcon name="plus" /><span>{{ labels.zoomIn }}</span></button>
    <button class="scene-button" :aria-label="labels.zoomOut" :title="labels.zoomOut" :disabled="zoom <= 1" @click="$emit('zoomOut')"><DashboardIcon name="minus" /><span>{{ labels.zoomOut }}</span></button>
    <button v-if="zoom !== 1 || daylight !== 100" class="scene-button" :aria-label="labels.reset" :title="labels.reset" @click="$emit('reset')"><DashboardIcon name="reset" /></button>
  </aside>
</template>
