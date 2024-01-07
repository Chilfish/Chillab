<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{
  post: Post
}>()

const emits = defineEmits<{
  'update:show': [show: boolean]
}>()
</script>

<template>
  <nav
    class="flex select-none items-center gap-4 px-2 py-3"
    bg="light-2 dark:dark-2"
    md="rounded-t-3"
  >
    <button
      class="h-8 w-8 rounded-full p-2"
      bg="light dark:dark"
      @click="emits('update:show', false)"
    >
      <span class="i-tabler-arrow-left icon" />
    </button>

    <NuxtImg
      loading="lazy"
      placeholder="/placeholder.png"
      class="h-10 w-10 rounded-full"
      src="/favicon.ico"
    />

    <span>{{ post.owner }}</span>

    <button
      class="ml-auto h-8 w-8 rounded-full p-2"
      bg="light dark:dark"
    >
      <span class="i-tabler-dots-vertical icon" />
    </button>
  </nav>
</template>
