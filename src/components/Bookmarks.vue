<script setup lang="ts">
import { useDropZone } from '@vueuse/core'

const dropZoneRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()

interface Bookmark {
  folderName: string
  bookmarks: {
    title: string
    url: string
    icon?: string
  }[]
}

const bookmarks = ref<Bookmark[]>()

async function onDrop(files: File[] | FileList | null) {
  const file = files?.[0]
  if (!file)
    return

  const content = await file.text()
  bookmarks.value = parser(content)
}

function parser(content: string): Bookmark[] {
  const div = document.createElement('div')
  div.innerHTML = content
  const root = div.querySelector('DL DT')
  const folders = root!.querySelectorAll('DL DT')

  return [...folders].map((folder) => {
    const name = folder.querySelector<HTMLHeadElement>('H3')

    if (!name)
      return undefined

    const _bookmarks = folder.querySelectorAll('A') as NodeListOf<HTMLAnchorElement>

    const bookmarks = [..._bookmarks].map((bookmark) => {
      return {
        title: bookmark.textContent || '',
        url: bookmark.href,
        icon: bookmark.attributes.getNamedItem('ICON')?.value,
      }
    })

    return {
      folderName: name.innerText || 'Default',
      bookmarks,
    } as Bookmark
  })
    .filter((item): item is Bookmark => !!item)
}

useDropZone(dropZoneRef, onDrop)
</script>

<template>
  <main class="center-col gap-4">
    <div
      ref="dropZoneRef"
      class="center-col border border-dashed gap-2 p-4 font-bold rounded-md text-gray-400 cursor-pointer  transition-colors duration-300 ease-in-out select-none text-5"
      hover="text-gray-600 border-gray-400 shadow-lg"
      @click="inputRef?.click()"
    >
      <p>  Drop your bookmarks.html here </p>
      <p>  or </p>
      <p> Click to select </p>

      <input
        ref="inputRef"
        type="file"
        class="hidden"
        accept=".html"
        @change="(e) => onDrop((e.target as HTMLInputElement).files)"
      >
    </div>

    <h1> Bookmarks </h1>

    <ul class="center-col items-start gap-2">
      <li
        v-for="(folder, i) in bookmarks"
        :key="i"
        class="w-full"
      >
        <h2 class="my-4">
          {{ folder.folderName }}
        </h2>

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
      </li>
    </ul>
  </main>
</template>
