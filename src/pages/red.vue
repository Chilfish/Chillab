<script setup lang="ts">
import type { Post } from '~/types'

const posts: Post[] = Array.from({ length: 5 }, (_, i) => [
  {
    id: `${i}`,
    title: `Red Post ${i}`,
    content: 'guys, who knows that...',
    owner: `momo_${i}`,
    likes: 10 * i,
    photos: ['/kurarin.webp'],
  },
]).flat()
</script>

<template>
  <main
    class="relative flex flex-col-reverse gap-2"
    lg="flex-row"
  >
    <aside
      class="fixed bottom-0 left-0 z-10 h-12 w-full rounded bg-light-5 p-4"
      lg="h-auto w-70 absolute top-0"
      dark="bg-dark-5"
    >
      aside
    </aside>

    <div
      class="grid grid-cols-2 w-fit items-center gap-3 p-2 pb-15"
      sm="grid-cols-3"
      md="grid-cols-4"
      lg="pl-74"
    >
      <red-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </main>
</template>
