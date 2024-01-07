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
  <div class="relative w-full center-col items-start gap-4">
    <button
      v-show="bookmarks.length > 0"
      class="fixed bottom-4 right-4 z-10 btn"
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
          <NuxtLink
            :to="bookmark.url"
            :no-rel="true"
            class="center justify-start gap-4"
            target="_blank"
          >
            <NuxtImg
              placeholder="/placeholder.png"
              loading="lazy"
              class="h-5 w-5 rounded"
              :src="bookmark.icon || '/placeholder.png'"
            />
            <span> {{ bookmark.title }} </span>
          </NuxtLink>
        </li>
      </ul>
    </details>
  </div>
</template>
