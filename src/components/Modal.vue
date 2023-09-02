<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
  show: boolean
}>()

const { show } = toRefs(props)
</script>

<template>
  <teleport to="body">
    <div
      v-show="show"
      class="fixed inset-0 z-999 h-full w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300"
      @click.self="() => $emit('update:show', false)"
    >
      <slot />
    </div>
  </teleport>
</template>
