<script setup lang="ts">
import type { Todo } from '~/types'

defineEmits<{
  toggle: [id: number]
  delete: [id: number]
}>()

const {
  item,
} = definePropsRefs<{
  item: Todo
}>()

const isExpanded = ref(false)

const contentStyle = computed(_ => ({
  'decoration-line-through': item.value.completed,
  'truncate': !isExpanded.value,
}))
</script>

<template>
  <div
    class="h-14 center cursor-pointer gap-2 rounded-3 px-4 py-2"
    bg="light-4 dark:dark-3"
    :class="{ 'h-auto': isExpanded }"
  >
    <input
      type="checkbox"
      :checked="item.completed"
      @click="$emit('toggle', item.id)"
    >

    <span
      class="h-full w-full overflow-x-auto p-2 text-start"
      :class="contentStyle"
      @dblclick="isExpanded = !isExpanded"
    >
      {{ item.text }}
    </span>

    <span
      class="i-tabler-trash h-6 w-6 text-red opacity-40 hover:opacity-100"
      @click="$emit('delete', item.id)"
    />
  </div>
</template>
