<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ value: string }>()
const segments: Record<string, string> = { '0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc', '5': 'afgcd', '6': 'afgecd', '7': 'abc', '8': 'abcdefg', '9': 'abfgcd', '-': 'g' }
const shapes: Record<string, string> = {
  a: '5,0 27,0 23,4 9,4', b: '28,1 28,20 24,17 24,6',
  c: '28,22 28,41 24,37 24,26', d: '5,42 27,42 23,38 9,38',
  e: '4,22 8,26 8,37 4,41', f: '4,1 8,6 8,17 4,20',
  g: '5,21 9,18 23,18 27,21 23,24 9,24',
}
const characters = computed(() => [...props.value])
</script>

<template>
  <span class="digital-number" :aria-label="value">
    <template v-for="(character, index) in characters" :key="index">
      <svg v-if="segments[character]" class="digital-digit" viewBox="0 0 32 42" aria-hidden="true">
        <polygon v-for="segment in segments[character]" :key="segment" :points="shapes[segment]" fill="currentColor" />
      </svg>
      <svg v-else-if="character === '.' || character === ','" class="digital-dot" viewBox="0 0 9 42" aria-hidden="true"><rect x="2" y="37" width="5" height="5" fill="currentColor" /></svg>
      <span v-else aria-hidden="true">{{ character }}</span>
    </template>
  </span>
</template>

<style scoped>
.digital-number { display: inline-flex; align-items: baseline; gap: .025em; white-space: nowrap; line-height: 1; }
.digital-digit { width: .66em; height: .9em; overflow: visible; }
.digital-dot { width: .19em; height: .9em; }
</style>
