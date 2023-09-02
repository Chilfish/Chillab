<script setup lang="ts">
import { Toast } from '@cp/Toast'
import { UseDraggable } from '@vueuse/components'

const toasts = ['info', 'success', 'warning', 'error'] as const
</script>

<template>
  <div class="my-4 flex gap-5">
    <button
      v-for="toast in toasts"
      :key="toast"
      :style="`background-color: var(--${toast})`"
      @click="Toast({ type: toast, message: `${toast} Toast` })"
    >
      {{ toast }} toast
    </button>
  </div>

  <UseDraggable
    v-slot="{ x, y }"
    class="fixed z-999 flex cursor-move select-none items-center justify-center rounded-2 bg-[#69696A30] p-4 backdrop-blur"
    :initial-value="{ x: 50, y: 50 }"
  >
    {{ x }}, {{ y }}
  </UseDraggable>
</template>
