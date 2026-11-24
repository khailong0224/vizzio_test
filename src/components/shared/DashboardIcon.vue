<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
    <g v-if="name === 'sun' || name === 'weather'" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <circle cx="24" cy="24" r="9" fill="currentColor" />
      <path d="M24 3v5m0 32v5M3 24h5m32 0h5M9 9l4 4m22 22 4 4M9 39l4-4m22-22 4-4" />
    </g>
    <path v-else-if="name === 'moon'" d="M36 35A18 18 0 0 1 17 6a18 18 0 1 0 19 29" fill="currentColor" />
    <g v-else-if="name === 'early'" fill="currentColor">
      <path d="m7 15 17-9 17 9v21l-17 9L7 36V15Zm17-5-11 6 11 6 11-6-11-6Zm-13 9v15l11 6V25l-11-6Z" opacity=".9" />
      <circle cx="25" cy="15" r="3" fill="#34434c" /><path d="m20 19 5-2 7 3-5 3-7-4Z" fill="#34434c" />
    </g>
    <g v-else-if="name === 'school'" fill="currentColor">
      <path d="M15 15a10 10 0 1 1 19 4l4 6-5 2v6H22v5h10l5 6H9l6-10 6-3v-3a14 14 0 0 1-6-13Z" />
      <path d="m18 7 2-4 3 4 3-3 2 5" stroke="currentColor" stroke-width="3" />
    </g>
    <g v-else-if="name === 'higher'" fill="currentColor">
      <circle cx="24" cy="12" r="10" /><path d="M7 45v-8c0-8 7-14 17-14s17 6 17 14v8H7Z" />
      <path d="m17 25 7 17 7-17-7 5-7-5Z" fill="#34434c" /><path d="m22 27 2-2 2 2-1 6 2 7-3 4-3-4 2-7-1-6Z" />
    </g>
    <g v-else-if="name === 'investment'" fill="currentColor">
      <circle cx="26" cy="13" r="10" /><path d="M5 39h8l11-8 14-1c5 0 5 6 0 7L21 44H5v-5Zm10-4 6-8h8c4 0 4 5 0 5h-4l-6 4-4-1Z" opacity=".9" />
      <path d="M26 6v14m4-11h-6a3 3 0 0 0 0 5h4a3 3 0 0 1 0 5h-6" stroke="#34434c" stroke-width="1.8" />
    </g>
    <g v-else-if="name === 'population'" fill="currentColor">
      <circle cx="18" cy="14" r="7" /><path d="M5 36v-7c0-6 6-10 13-10s13 4 13 10v7H5Z" /><path d="M37 7v34H10v-3h24V7h3Z" />
    </g>
    <g v-else stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path v-if="name === 'plus'" d="M24 10v28M10 24h28" />
      <path v-else-if="name === 'minus'" d="M10 24h28" />
      <path v-else-if="name === 'reset'" d="M10 17a16 16 0 1 1 0 14M10 7v10h10" />
      <path v-else-if="name === 'fullscreen'" d="M17 7H7v10m24-10h10v10M7 31v10h10m24-10v10H31" />
      <path v-else-if="name === 'pause'" d="M18 12v24m12-24v24" />
      <path v-else-if="name === 'play'" d="m17 10 22 14-22 14V10Z" />
      <path v-else-if="name === 'arrow'" d="M24 38V10M13 21l11-11 11 11" />
    </g>
  </svg>
</template>
