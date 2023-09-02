<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{
  post: Post
}>()
</script>

<template>
  <nav
    class="flex select-none items-center gap-4 bg-light-2 px-2 py-3"
    dark="bg-dark-2"
    md="rounded-t-3"
  >
    <button
      class="h-8 w-8 rounded-full bg-light p-2"
      dark="bg-dark"
      @click="$emit('update:show')"
    >
      <span class="icon i-tabler-arrow-left" />
    </button>

    <img
      class="h-10 w-10 rounded-full"
      src="/favicon.ico"
    >

    <span>{{ post.owner }}</span>

    <button
      class="ml-auto h-8 w-8 rounded-full bg-light p-2"
      dark="bg-dark"
    >
      <span class="icon i-tabler-dots-vertical" />
    </button>
  </nav>
</template>
