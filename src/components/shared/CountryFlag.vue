<script setup lang="ts">
defineProps<{ code: string }>()
const star = '0,-5 1.5,-1.5 5,-1.5 2.3,1 3.1,4.5 0,2.4 -3.1,4.5 -2.3,1 -5,-1.5 -1.5,-1.5'
</script>

<template>
  <svg viewBox="0 0 60 40" aria-hidden="true" focusable="false">
    <template v-if="code === 'ae'">
      <path fill="#00843d" d="M0 0h60v14H0z" /><path fill="#fff" d="M0 14h60v13H0z" /><path fill="#111" d="M0 27h60v13H0z" /><path fill="#ef3340" d="M0 0h15v40H0z" />
    </template>
    <template v-else-if="code === 'us'">
      <path fill="#fff" d="M0 0h60v40H0z" /><path v-for="stripe in 7" :key="stripe" fill="#b22234" :d="`M0 ${(stripe-1)*40/6.5}h60v${40/13}H0z`" /><path fill="#3c3b6e" d="M0 0h27v22H0z" />
      <g fill="white"><g v-for="row in 5" :key="row"><circle v-for="column in 6" :key="column" :cx="2.5+(column-1)*4.4" :cy="2.5+(row-1)*4.2" r=".9" /></g></g>
    </template>
    <template v-else-if="code === 'cn'">
      <path fill="#de2910" d="M0 0h60v40H0z" /><g fill="#ffde00"><polygon :points="star" transform="translate(11 11) scale(1.1)" /><polygon v-for="(point,index) in [[21,5],[25,11],[25,18],[20,23]]" :key="index" :points="star" :transform="`translate(${point.join(' ')}) scale(.36)`" /></g>
    </template>
    <template v-else-if="code === 'kw'">
      <path fill="#007a3d" d="M0 0h60v14H0z" /><path fill="#fff" d="M0 14h60v13H0z" /><path fill="#ce1126" d="M0 27h60v13H0z" /><path fill="#111" d="m0 0 16 14v13L0 40V0Z" />
    </template>
    <template v-else-if="code === 'hk'">
      <path fill="#de2910" d="M0 0h60v40H0z" /><path v-for="petal in 5" :key="petal" fill="white" d="M30 20c-14-4-8-17-1-14-4 6 7 6 1 14Z" :transform="`rotate(${(petal-1)*72} 30 20)`" />
    </template>
  </svg>
</template>
