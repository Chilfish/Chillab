<script setup lang="ts">
import type { Bookmark } from '~/types'

const Selector = ref<any>(null)
const bookmarks = shallowRef([] as Bookmark[])

watchEffect(async () => {
  if (Selector.value === null)
    return
  bookmarks.value = await parseBookmark(Selector.value.fileText)
})
</script>

<template>
  <main class="w-full center-col gap-4 px-4">
    <SelectFile
      ref="Selector"
      hint="bookmarks.html"
      accept=".html"
    />

    <h1 v-show="bookmarks.length">
      Bookmarks
    </h1>

    <bookmark-item :bookmarks="bookmarks" />
  </main>
</template>
