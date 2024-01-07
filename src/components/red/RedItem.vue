<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{
  post: Post
}>()

const emits = defineEmits<{
  'showDetail': []
}>()
</script>

<template>
  <section
    class="aspect-ratio-3/4 flex flex-col cursor-pointer gap-2 rounded-2"
  >
    <NuxtImg
      loading="lazy"
      placeholder="/placeholder.png"
      class="h-full w-full rounded-2 object-cover transition-all"
      hover="scale-102 brightness-80"
      :src="post.photos[0]"
      @click="emits('showDetail')"
    />

    <p>{{ post.title }}</p>

    <div class="flex justify-between text-3">
      <div class="flex items-center gap-2">
        <NuxtImg
          loading="lazy"
          placeholder="/placeholder.png"
          class="h-8 w-8 rounded-full object-cover"
          src="/favicon.ico"
        />
        <span>{{ post.owner }}</span>
      </div>

      <div
        class="center gap-1"
        hover="text-red"
      >
        <span class="i-tabler-heart icon" />
        <span>{{ post.likes }}</span>
      </div>
    </div>
  </section>
</template>
