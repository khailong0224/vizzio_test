<script setup lang="ts">
import type { InvestmentData } from '../../types/dashboard'
import { number } from '../../utils/format'
import DigitalNumber from '../shared/DigitalNumber.vue'
import CountryFlag from '../shared/CountryFlag.vue'
defineProps<{ data: InvestmentData['economies'] }>()
</script>

<template>
  <section class="source-economies" aria-labelledby="economies-title">
    <div class="economies-heading flex items-baseline justify-between"><h2 id="economies-title" class="panel-heading">{{ data.title }}</h2><span>({{ data.unit }})</span></div>
    <ol class="economies-list grid">
      <li v-for="economy in data.items" :key="economy.code" class="flex items-center">
        <CountryFlag class="country-flag" :code="economy.code" /><span class="economy-name">{{ economy.label }}</span><DigitalNumber class="economy-value" :value="number(economy.value)" />
      </li>
    </ol>
  </section>
</template>
