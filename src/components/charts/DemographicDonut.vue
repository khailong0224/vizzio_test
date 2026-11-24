<script setup lang="ts">
import { computed } from 'vue'
import type { PopulationData } from '../../types/dashboard'
import DigitalNumber from '../shared/DigitalNumber.vue'

const props = defineProps<{ data: PopulationData['demographics'] }>()
const total = computed(() => props.data.segments.reduce((sum, item) => sum + Math.max(0, item.value), 0))
const arcs = computed(() => {
  let offset = 0
  return props.data.segments.map(item => {
    const share = total.value ? Math.max(0, item.value) / total.value * 100 : 0
    const arc = { ...item, share, offset }
    offset += share
    return arc
  })
})
const summary = computed(() => props.data.segments.map(item => `${item.label}: ${item.value}${props.data.unit}`).join('; '))
</script>

<template>
  <section class="demographics" aria-labelledby="demographic-title">
    <h2 id="demographic-title" class="panel-heading">{{ data.title }}</h2>
    <div class="demographic-content flex items-center">
      <div class="donut-wrap">
        <svg viewBox="0 0 180 180" class="donut" role="img" :aria-label="summary">
          <circle cx="90" cy="90" r="72" fill="none" stroke="#ffffff16" stroke-width="28" />
          <circle v-for="arc in arcs" :key="arc.label" class="donut-arc" cx="90" cy="90" r="72" fill="none" :stroke="arc.color" stroke-width="28" pathLength="100" :stroke-dasharray="`${arc.share} ${100 - arc.share}`" :stroke-dashoffset="-arc.offset" transform="translate(180 0) scale(-1 1) rotate(-90 90 90)" />
          <text x="90" y="96" text-anchor="middle" fill="white" font-size="22">{{ data.centerLabel }}</text>
        </svg>
      </div>
      <dl class="donut-legend grid">
        <div v-for="segment in data.segments" :key="segment.label" class="legend-item">
          <dt class="flex items-center"><span class="legend-dot" :style="{ backgroundColor: segment.color, color: segment.color }" />{{ segment.label }}</dt>
          <dd class="legend-value"><DigitalNumber :value="String(segment.value)" /><span class="legend-unit">{{ data.unit }}</span></dd>
        </div>
      </dl>
    </div>
  </section>
</template>
