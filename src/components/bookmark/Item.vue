<script setup lang="ts">
import type { Bookmark } from '~/types'

defineProps<{
  bookmarks: Bookmark[]
}>()

const isOpen = ref(false)

function toggleAll() {
  const details = document.querySelectorAll('details')
  details.forEach((detail) => {
    detail.open = isOpen.value
  })
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="center-col w-full items-start gap-4 relative">
    <button
      class="btn fixed bottom-4 right-4 z-10"
      @click="toggleAll"
    >
      {{ isOpen ? 'Open' : 'Close' }} All
    </button>

    <details
      v-for="(folder, i) in bookmarks"
      :key="i"
      class="w-full"
      open
    >
      <summary class="w-full">
        <h2 class="my-4 cursor-pointer">
          {{ folder.folderName }}
        </h2>
      </summary>

      <ul class="center-col items-start gap-2">
        <li
          v-for="bookmark in folder.bookmarks"
          :key="bookmark.url"
        >
          <a
            :href="bookmark.url"
            class="center justify-start gap-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              class="w-5 h-5 rounded"
              :src="bookmark.icon || '/placeholder.png'"
            >
            {{ bookmark.title }}
          </a>
        </li>
      </ul>
    </details>
  </div>
</template>
