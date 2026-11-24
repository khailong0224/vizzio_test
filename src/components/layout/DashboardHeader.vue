<script setup lang="ts">
import type { CommonData, DashboardMeta } from '../../types/dashboard'
import { assetUrl } from '../../utils/format'
import DashboardIcon from '../shared/DashboardIcon.vue'
defineProps<{ common: CommonData; page: DashboardMeta }>()
</script>

<template>
  <header class="dashboard-header relative z-10 flex items-center justify-between">
    <img class="page-brands" :class="`page-brands--${page.id}`" :src="assetUrl(page.brands.src)" :alt="page.brands.alt" />
    <div class="compass" role="img" :aria-label="`${common.compass.label}: ${common.compass.ticks.join(', ')}`">
      <div class="compass-line" /><span class="compass-pointer" />
      <div class="compass-ticks"><span v-for="tick in common.compass.ticks" :key="tick">{{ tick }}</span></div>
      <span class="compass-anchor" />
    </div>
    <div class="header-status flex items-center">
      <div class="snapshot-meta flex items-center">
        <span>{{ page.header.time }}</span><span>{{ page.header.date }}</span>
        <span class="flex items-center gap-1"><DashboardIcon class="weather-icon" name="sun" />{{ page.header.temperature }}</span>
      </div>
      <img class="provider-brands" :src="assetUrl(common.providers.src)" :alt="common.providers.alt" />
    </div>
  </header>
</template>
