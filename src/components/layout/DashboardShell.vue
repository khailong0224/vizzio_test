<script setup lang="ts">
import { ref } from 'vue'
import { useDashboardData } from '../../composables/useDashboardData'
import type { CommonData, DashboardMeta } from '../../types/dashboard'
import { assetUrl } from '../../utils/format'
import DashboardHeader from './DashboardHeader.vue'
import DataStatus from '../shared/DataStatus.vue'

defineProps<{ page: DashboardMeta }>()
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
    <main id="dashboard-content" class="dashboard-content relative z-10" tabindex="-1">
      <slot :common="common" />
    </main>
    <nav class="dashboard-nav" :aria-label="common.navigationLabel">
      <RouterLink v-for="item in common.pages" :key="item.id" :to="item.to" :title="item.label">{{ item.shortLabel }}</RouterLink>
    </nav>
  </div>
  <DataStatus v-else :error="error" @retry="reload" />
</template>
