<script setup lang="ts">
defineProps<{ error: boolean }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <main class="data-status flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center" :role="error ? 'alert' : 'status'">
    <h1 class="text-xl font-medium">{{ error ? 'Dashboard data could not be loaded' : 'Loading dashboard' }}</h1>
    <p v-if="error" class="max-w-md text-slate-300">Check the JSON files in public/data, then try again.</p>
    <button v-if="error" class="min-h-11 cursor-pointer border border-white/40 px-5 py-2 hover:bg-white/10" @click="$emit('retry')">Try again</button>
    <span v-else class="loading-ring" aria-hidden="true" />
  </main>
</template>
