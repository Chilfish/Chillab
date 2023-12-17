<script setup lang="ts">
import type { Bookmark } from '~/types'

const dropZoneRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()

const bookmarks = ref([] as Bookmark[])

async function onDrop(files: File[] | FileList | null) {
  const file = files?.[0]
  if (!file)
    return

  const content = await file.text()
  bookmarks.value = parseBookmark(content)
}

useDropZone(dropZoneRef, onDrop)
</script>

<template>
  <main class="w-full center-col gap-4 px-4">
    <div
      ref="dropZoneRef"
      class="m-4 h-42 w-100 center-col cursor-pointer select-none gap-2 border-2 rounded-md border-dashed p-4 font-bold trans-all"
      text="6 gray-400"
      hover="text-gray-600 border-gray-400 shadow-lg"
      @click="inputRef?.click()"
    >
      <p> Drop your Image here </p>
      <p> or </p>
      <p> Click to select </p>

      <input
        ref="inputRef"
        type="file"
        class="hidden"
        accept=".html"
        @change="(e) => onDrop((e.target as HTMLInputElement).files)"
      >
    </div>

    <h1 v-show="bookmarks.length">
      Bookmarks
    </h1>

    <bookmark-item :bookmarks="bookmarks" />
  </main>
</template>
