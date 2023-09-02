<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{
  post: Post
}>()
</script>

<template>
  <section
    class="aspect-ratio-3/4 flex flex-col cursor-pointer gap-2 rounded-2"
  >
    <img
      class="h-full w-full rounded-2 object-cover transition-all"
      hover="scale-102 brightness-80"
      loading="lazy"
      :src="post.photos[0]"
    >

    <p>{{ post.title }}</p>

    <div class="flex justify-between text-3">
      <div class="flex items-center gap-3">
        <img
          class="h-8 w-8 rounded-full object-cover"
          src="/favicon.ico"
        >
        <span>{{ post.owner }}</span>
      </div>

      <div
        class="flex items-center justify-center gap-1"
        hover="text-red"
      >
        <span class="icon i-tabler-heart" />
        <span>{{ post.likes }}</span>
      </div>
    </div>
  </section>
</template>
