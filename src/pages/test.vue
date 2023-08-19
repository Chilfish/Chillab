<script setup lang="ts">
import { Toast } from '@cp/Toast'

const toasts = ['info', 'success', 'warning', 'error'] as const
</script>

<template>
  <div class="flex gap-5">
    <button
      v-for="toast in toasts"
      :key="toast"
      :style="`background-color: var(--${toast})`"
      @click="Toast({ type: toast, message: `${toast} Toast` })"
    >
      {{ toast }} toast
    </button>
  </div>
</template>
