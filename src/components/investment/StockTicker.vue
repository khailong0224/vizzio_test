<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { InvestmentData } from '../../types/dashboard'
import { number, signed } from '../../utils/format'
import DashboardIcon from '../shared/DashboardIcon.vue'

defineProps<{ data: InvestmentData['ticker'] }>()
const userPaused = ref(false)
const hovered = ref(false)
const focused = ref(false)
const reducedMotion = ref(false)
const pageHidden = ref(false)
const paused = computed(() => userPaused.value || hovered.value || focused.value || reducedMotion.value || pageHidden.value)
let media: MediaQueryList | undefined
function updateMotion() { reducedMotion.value = media?.matches ?? false }
function updateVisibility() { pageHidden.value = document.hidden }
onMounted(() => {
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateMotion()
  updateVisibility()
  media.addEventListener('change', updateMotion)
  document.addEventListener('visibilitychange', updateVisibility)
})
onBeforeUnmount(() => {
  media?.removeEventListener('change', updateMotion)
  document.removeEventListener('visibilitychange', updateVisibility)
})
</script>

<template>
  <footer class="stock-ticker relative z-10" :class="{ 'ticker-paused': paused, 'ticker-reduced-motion': reducedMotion }" :aria-label="data.label" @mouseenter="hovered = true" @mouseleave="hovered = false" @focusin="focused = true" @focusout="focused = false">
    <div class="ticker-viewport" tabindex="0" :aria-label="data.label">
      <div class="ticker-track" :style="{ animationDuration: `${Math.max(10, data.durationSeconds)}s` }">
        <ul v-for="copy in 2" :key="copy" class="ticker-group flex items-center" :class="{ 'ticker-duplicate': copy === 2 }" :aria-hidden="copy === 2 ? 'true' : undefined">
          <li v-for="stock in data.items" :key="stock.name" class="ticker-item flex items-baseline">
            <span class="stock-name">{{ stock.name }}</span><span>{{ number(stock.price, stock.priceDecimals) }} {{ data.unit }}</span><span :class="stock.change > 0 ? 'change-positive' : 'change-negative'">{{ stock.change === 0 ? '=0' : signed(stock.change, 4) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <button class="ticker-toggle" :aria-label="reducedMotion ? data.reducedMotionLabel : userPaused ? data.resumeLabel : data.pauseLabel" :title="reducedMotion ? data.reducedMotionLabel : userPaused ? data.resumeLabel : data.pauseLabel" :aria-pressed="userPaused" :disabled="reducedMotion" @click="userPaused = !userPaused"><DashboardIcon :name="userPaused ? 'play' : 'pause'" /></button>
  </footer>
</template>
