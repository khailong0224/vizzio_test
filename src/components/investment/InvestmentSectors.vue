<script setup lang="ts">
import { computed } from 'vue'
import type { InvestmentData } from '../../types/dashboard'
import { number, signed } from '../../utils/format'
import DigitalNumber from '../shared/DigitalNumber.vue'
import DashboardIcon from '../shared/DashboardIcon.vue'
const props = defineProps<{ data: InvestmentData['sectors'] }>()
const total = computed(() => props.data.items.reduce((sum, item) => sum + Math.max(0, item.value), 0))
</script>

<template>
  <section class="investment-sectors" aria-labelledby="sectors-title">
    <h2 id="sectors-title" class="panel-heading">{{ data.title }}</h2>
    <div class="sectors-grid grid" :style="{ gridTemplateColumns: `repeat(${data.items.length}, minmax(0, 1fr))` }">
      <div v-for="sector in data.items" :key="sector.label" class="sector-stat">
        <p class="sector-value flex items-baseline"><DigitalNumber :value="String(sector.value)" /><span>{{ data.unit }}</span></p>
        <h3>{{ sector.label }}</h3>
        <p class="sector-change-label">{{ data.changeLabel }}</p>
        <p class="sector-change flex items-center" :class="sector.change < 0 ? 'change-negative' : 'change-positive'" :aria-label="`${data.changeLabel}: ${signed(sector.change)}${data.unit}`">{{ number(Math.abs(sector.change)) }}{{ data.unit }}<DashboardIcon name="arrow" :class="{ 'arrow-down': sector.change < 0 }" /></p>
      </div>
    </div>
    <div class="sector-bar flex" role="img" :aria-label="data.items.map(item => `${item.label}: ${item.value}${data.unit}`).join('; ')">
      <span v-for="sector in data.items" :key="sector.label" :style="{ width: `${total ? Math.max(0, sector.value) / total * 100 : 0}%`, backgroundColor: sector.color, boxShadow: `0 0 12px ${sector.color}a0` }" />
    </div>
  </section>
</template>
