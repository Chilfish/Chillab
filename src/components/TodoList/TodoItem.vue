<script setup lang="ts">
import type { todoItem } from '~/types'

defineProps<{
  item: todoItem
}>()

defineEmits([
  'toggle',
  'delete',
])
</script>

<template>
  <div
    w-xs h-14 m-3 p-4 rounded-3
    bg-dark-50 hover:bg-dark-100
    flex items-center
  >
    <label mx-2 for="toggle">
      <input
        name="toggle"
        type="checkbox"
        @click="$emit('toggle', item.id)"
      >
    </label>
    <span :class="{ done: item.done }">{{ item.content }}</span>
    <span
      i-carbon-trash-can color-red opacity-40
      cursor-pointer hover:opacity-100
      mx-2 ml-auto
      @click="$emit('delete', item.id)"
    />
  </div>
</template>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
