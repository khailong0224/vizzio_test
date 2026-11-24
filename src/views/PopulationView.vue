<script setup lang="ts">
import { watch } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'
import type { PopulationData } from '../types/dashboard'
import DashboardShell from '../components/layout/DashboardShell.vue'
import DataStatus from '../components/shared/DataStatus.vue'
import DashboardIcon from '../components/shared/DashboardIcon.vue'
import DemographicDonut from '../components/charts/DemographicDonut.vue'
import AgeStat from '../components/population/AgeStat.vue'
import RegionalBars from '../components/charts/RegionalBars.vue'

const { data, error, reload } = useDashboardData<PopulationData>('population.json')
watch(data, page => { if (page) document.title = page.title })
</script>

<template>
  <DashboardShell v-if="data" :page="data">
    <div class="population-panel">
      <h1 class="population-heading flex items-center"><DashboardIcon name="population" />{{ data.title }}</h1>
      <div class="population-grid grid">
        <DemographicDonut :data="data.demographics" />
        <AgeStat v-for="group in data.ageGroups" :key="group.id" :group="group" />
        <RegionalBars :data="data.regions" />
      </div>
    </div>
  </DashboardShell>
  <DataStatus v-else :error="error" @retry="reload" />
</template>
