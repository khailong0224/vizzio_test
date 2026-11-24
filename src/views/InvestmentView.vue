<script setup lang="ts">
import { watch } from 'vue'
import { useDashboardData } from '../composables/useDashboardData'
import type { InvestmentData } from '../types/dashboard'
import DashboardShell from '../components/layout/DashboardShell.vue'
import DataStatus from '../components/shared/DataStatus.vue'
import FdiSummary from '../components/investment/FdiSummary.vue'
import InvestmentSectors from '../components/investment/InvestmentSectors.vue'
import SourceEconomies from '../components/investment/SourceEconomies.vue'
import StockTicker from '../components/investment/StockTicker.vue'

const { data, error, reload } = useDashboardData<InvestmentData>('investment.json')
watch(data, page => { if (page) document.title = page.title })
</script>

<template>
  <DashboardShell v-if="data" :page="data" :weather-title="data.weatherTitle">
    <div class="investment-grid grid items-end">
      <FdiSummary :data="data.total" />
      <InvestmentSectors :data="data.sectors" />
      <SourceEconomies :data="data.economies" />
    </div>
    <template #footer><StockTicker :data="data.ticker" /></template>
  </DashboardShell>
  <DataStatus v-else :error="error" @retry="reload" />
</template>
