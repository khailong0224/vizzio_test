<script setup lang="ts">
import type { AgeGroup } from '../../types/dashboard'
import { number, signed } from '../../utils/format'
import DigitalNumber from '../shared/DigitalNumber.vue'
import DashboardIcon from '../shared/DashboardIcon.vue'
defineProps<{ group: AgeGroup }>()
</script>

<template>
  <section class="age-stat flex flex-col items-center text-center" :aria-labelledby="`age-${group.id}`">
    <DashboardIcon class="age-icon" :name="group.icon" />
    <h2 :id="`age-${group.id}`" class="age-label">{{ group.label }}</h2>
    <p class="age-value flex items-baseline justify-center"><DigitalNumber :value="number(group.value, group.decimals)" /><span>{{ group.unit }}</span></p>
    <p class="growth-line">{{ group.growthLabel }} <span :class="group.growth < 0 ? 'change-negative' : 'change-positive'"><DashboardIcon name="arrow" :class="{ 'arrow-down': group.growth < 0 }" />{{ signed(group.growth) }}%</span></p>
  </section>
</template>
