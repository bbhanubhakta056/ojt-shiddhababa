<!-- components/Toast.vue
<template>
  <div v-if="toast.show" :class="`transition-opacity duration-300 ease-in-out
    ${toast.show ? 'opacity-100' : 'opacity-0'} fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white z-50
    ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`">
    <span>{{ toast.message }}</span>
    <button @click="toast.show = false" class="text-white hover:text-gray-200 font-bold">&times;</button>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast';
const toast = useToastStore();
</script> -->

<template>
  <div class="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="`relative w-72 px-4 py-3 rounded shadow-lg text-white flex items-start justify-between gap-3
        ${toast.type === 'success' ? 'bg-green-600'
          : toast.type === 'error' ? 'bg-red-600'
          : toast.type === 'info' ? 'bg-blue-600'
          : 'bg-yellow-500'}`"
    >
      <span class="text-sm leading-snug">{{ toast.message }}</span>
      <button @click="dismiss(toast.id)" class="text-white font-bold ml-2">&times;</button>

      <!-- Progress bar -->
      <div class="absolute bottom-0 left-0 h-1 bg-white/50 animate-progress" :style="{ animationDuration: toast.duration + 'ms' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '../../stores/toast';
const toastStore = useToastStore();
const toasts = toastStore.toasts;
const dismiss = toastStore.dismiss;
</script>

<style scoped>
@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}

.animate-progress {
  animation-name: progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>

