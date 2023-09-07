<script setup lang="ts">
import { Toast } from '@cp/Toast'
import { UseDraggable } from '@vueuse/components'
</script>

<template>
  <div class="flex flex-col gap-4 pb-2">
    <button
      class="w-16 btn"
      @click="Toast({ type: 'success', message: `Success Toast` })"
    >
      toast
    </button>

    <SortArr />
  </div>

  <UseDraggable
    v-slot="{ x, y }"
    class="fixed z-999 center cursor-move select-none rounded-2 p-4 backdrop-blur"
    bg="[#00000010] dark:[#ffffff10]"
    :initial-value="{ x: 50, y: 50 }"
  >
    {{ x }}, {{ y }}
  </UseDraggable>
</template>
