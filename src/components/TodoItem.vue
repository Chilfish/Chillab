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
    class="m-2 h-14 flex items-center rounded-3 bg-[--gray] p-4"
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
      class="h-full w-full cursor-pointer overflow-x-auto px-2 text-start"
      :class="contentStyle"
      @click="isExpanded = !isExpanded"
    >
      {{ item.content }}
    </span>
    <span
      class="i-carbon-trash-can h-6 w-6 cursor-pointer color-[--red] opacity-40 hover:opacity-100"
      @click="$emit('delete', item.id)"
    />
  </div>
</template>
