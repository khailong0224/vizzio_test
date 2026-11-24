<script setup lang="ts">
import { ref } from 'vue'
import { useDashboardData } from '../../composables/useDashboardData'
import type { CommonData, DashboardMeta } from '../../types/dashboard'
import { assetUrl } from '../../utils/format'
import DashboardHeader from './DashboardHeader.vue'
import DataStatus from '../shared/DataStatus.vue'
import SceneControls from './SceneControls.vue'

defineProps<{ page: DashboardMeta; weatherTitle?: string }>()
const { data: common, error, reload } = useDashboardData<CommonData>('common.json')
const zoom = ref(1)
const daylight = ref(100)
function focusContent() {
  document.getElementById('dashboard-content')?.focus()
}
</script>

<template>
  <div v-if="common" class="dashboard-shell" :class="`dashboard-shell--${page.id}`">
    <a class="skip-link" href="#dashboard-content" @click.prevent="focusContent">{{ common.skipLabel }}</a>
    <div class="city-scene" aria-hidden="true" :style="{ backgroundImage: `url('${assetUrl(page.background)}')`, transform: `scale(${zoom})`, filter: `brightness(${daylight / 100})` }" />
    <div class="scene-shade" aria-hidden="true" />
    <DashboardHeader :common="common" :page="page" />
    <SceneControls v-if="weatherTitle" :labels="common.controls" :page="page" :weather-title="weatherTitle" :zoom="zoom" :daylight="daylight" @zoom-in="zoom = Math.min(1.75, zoom + .25)" @zoom-out="zoom = Math.max(1, zoom - .25)" @daylight="daylight = $event" @reset="zoom = 1; daylight = 100" />
    <main id="dashboard-content" class="dashboard-content relative z-10" tabindex="-1">
      <slot :common="common" />
    </main>
    <slot name="footer" />
    <nav class="dashboard-nav" :aria-label="common.navigationLabel">
      <RouterLink v-for="item in common.pages" :key="item.id" :to="item.to" :title="item.label">{{ item.shortLabel }}</RouterLink>
    </nav>
  </div>
  <DataStatus v-else :error="error" @retry="reload" />
</template>
