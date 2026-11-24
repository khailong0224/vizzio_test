<script setup lang="ts">
import { computed } from 'vue'
import type { PopulationData } from '../../types/dashboard'

const props = defineProps<{ data: PopulationData['regions'] }>()
const ticks = computed(() => {
  const { min, max, step } = props.data.axis
  if (step <= 0 || max <= min) return []
  return Array.from({ length: Math.min(50, Math.floor((max - min) / step) + 1) }, (_, index) => max - index * step)
})
const range = computed(() => Math.max(1, props.data.axis.max - props.data.axis.min))
function height(value: number) { return Math.max(0, Math.min(100, (value - props.data.axis.min) / range.value * 100)) }
</script>

<template>
  <section class="regional-distribution" aria-labelledby="regions-title">
    <h2 id="regions-title" class="panel-heading">{{ data.title }}</h2>
    <div class="regional-chart" role="img" :aria-label="data.items.map(item => `${item.label}: ${item.value}${data.unit}`).join('; ')">
      <div class="chart-plot">
        <div class="chart-grid" aria-hidden="true"><div v-for="tick in ticks" :key="tick" :style="{ top: `${(data.axis.max - tick) / range * 100}%` }"><span>{{ tick }}{{ data.unit }}</span></div></div>
        <div class="bar-columns">
          <div v-for="region in data.items" :key="region.label" class="bar-column">
            <div class="region-bar" :style="{ height: `${height(region.value)}%` }"><span class="bar-cap" /></div>
            <span class="bar-label">{{ region.label }}</span>
          </div>
        </div>
      </div>
    </div>
    <table class="sr-only"><caption>{{ data.title }}</caption><tbody><tr v-for="region in data.items" :key="region.label"><th scope="row">{{ region.label }}</th><td>{{ region.value }}{{ data.unit }}</td></tr></tbody></table>
  </section>
</template>
