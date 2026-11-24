<script setup lang="ts">
import type { InvestmentData } from '../../types/dashboard'
import { number, signed } from '../../utils/format'
import DigitalNumber from '../shared/DigitalNumber.vue'
import DashboardIcon from '../shared/DashboardIcon.vue'
defineProps<{ data: InvestmentData['total'] }>()
</script>

<template>
  <section class="fdi-summary" aria-labelledby="fdi-title">
    <h1 id="fdi-title" class="panel-heading">{{ data.title }}</h1>
    <div class="fdi-body grid items-end">
      <div>
        <p class="fdi-total flex items-center"><DashboardIcon name="investment" /><span class="flex items-baseline"><DigitalNumber :value="number(data.value, data.decimals)" /><span class="fdi-unit">{{ data.unit }}</span></span></p>
        <p class="fdi-caption">{{ data.caption }}</p>
      </div>
      <div class="fdi-change">
        <p class="flex items-center" :class="data.change < 0 ? 'change-negative' : 'change-positive'" :aria-label="`${data.changeLabel}: ${signed(data.change)}%`"><DashboardIcon name="arrow" :class="{ 'arrow-down': data.change < 0 }" />{{ number(Math.abs(data.change)) }}%</p>
        <p class="fdi-change-label">{{ data.changeLabel }}</p>
      </div>
    </div>
  </section>
</template>
