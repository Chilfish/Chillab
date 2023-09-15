<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{
  post: Post
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
      @click="$emit('update:show')"
    >
      <span class="i-tabler-arrow-left icon" />
    </button>

    <img
      class="h-10 w-10 rounded-full"
      src="/favicon.ico"
    >

    <span>{{ post.owner }}</span>

    <button
      class="ml-auto h-8 w-8 rounded-full p-2"
      bg="light dark:dark"
    >
      <span class="i-tabler-dots-vertical icon" />
    </button>
  </nav>
</template>
