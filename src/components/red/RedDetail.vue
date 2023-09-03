<script setup lang="ts">
import type { Post } from '~/types'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div
    class="relative h-full w-full overflow-y-hidden transition-all duration-300"
    flex="~ col"
    md="h-90% max-w-80% flex-row rounded-3"
    bg="light-5 dark:dark-5"
  >
    <RedNav
      class="flex!"
      md="hidden!"
      :post="post"
      @update:show="$emit('update:show')"
    />

    <div
      class="h-full w-full"
      md="rounded-l-3"
      bg="light dark:dark"
    >
      <div
        class="h-full w-full"
        bg="contain center no-repeat"
        :style="`background-image: url('${post.photos[0]}')`"
      />
    </div>

    <main
      class="h-full"
      md="w-180 "
    >
      <RedNav
        class="hidden!"
        md="flex! rounded-tl-0"
        :post="post"
        @update:show="$emit('update:show', false)"
      />

      <div class="h-full flex flex-col gap-3 overflow-y-auto p-4">
        <h4 text="start 5">
          {{ post.title }}
        </h4>
        <p class="break-all">
          {{ post.content }}
        </p>
      </div>
    </main>
  </div>
</template>
