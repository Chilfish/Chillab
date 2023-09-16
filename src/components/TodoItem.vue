<script setup lang="ts">
import type { Todo } from '~/types'

const {
  item,
} = defineProps<{
  item: Todo
}>()

defineEmits<{
  toggle: [id: number]
  delete: [id: number]
}>()

const isExpanded = ref(false)

const contentStyle = computed(_ => ({
  'decoration-line-through': item.done,
  'truncate': !isExpanded.value,
}))
</script>

<template>
  <div
    class="h-14 flex cursor-pointer rounded-3 p-4"
    bg="light-4 dark:dark-3"
    :class="{ 'h-auto': isExpanded }"
  >
    <input
      type="checkbox"
      :checked="item.done"
      @click="$emit('toggle', item.id)"
    >

    <span
      class="h-full w-full overflow-x-auto px-2 text-start"
      :class="contentStyle"
      @dblclick="isExpanded = !isExpanded"
    >
      {{ item.content }}
    </span>

    <span
      class="i-tabler-trash h-6 w-6 text-red opacity-40 hover:opacity-100"
      @click="$emit('delete', item.id)"
    />
  </div>
</template>
