<script setup lang="ts">
import { computed, ref } from 'vue'
import type { todoItem } from '~/types'

const prop = defineProps<{
  item: todoItem
}>()

defineEmits([
  'toggle',
  'delete',
])

const isExpanded = ref(false)

const contentStyle = computed(_ => ({
  'decoration-line-through': prop.item.done,
  'truncate': !isExpanded.value,
}))
</script>

<template>
  <div
    h-14 m-2 p-4 rounded-3
    bg-dark-50 hover:bg-dark-100
    flex items-center
    :class="{ 'h-auto': isExpanded }"
  >
    <label>
      <input
        type="checkbox"
        :checked="item.done"
        @click="$emit('toggle', item.id)"
      >
    </label>
    <span
      w-full h-full px-2 overflow-x-auto
      cursor-pointer text-start
      :class="contentStyle"
      @click="isExpanded = !isExpanded"
    >
      {{ item.content }}
    </span>
    <span
      w-6 h-6
      i-carbon-trash-can color-red opacity-40
      cursor-pointer hover:opacity-100
      @click="$emit('delete', item.id)"
    />
  </div>
</template>
