<script setup lang="ts">
import type { Bookmark } from '~/types'

const {
  data,
} = useFetch<string>('/bookmarks.xml', {
  server: false,
})

const bookmark = computed<Bookmark[]>(() => data.value ? parseBookmark(data.value) : [])
</script>

<template>
  <main class="w-full">
    <common-header />
    <bookmark-item
      class="p-8 mt-8"
      :bookmarks="bookmark"
    />
  </main>
</template>
