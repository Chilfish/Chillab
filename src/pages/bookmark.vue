<script setup lang="ts">
import type { Bookmark } from '~/types'

const title = 'Chilfish\'s Bookmarks'
const description = 'Chilfish\'s online bookmarks, you can find some useful websites here and parse your bookmarks at /test#Bookmarks.'

const host = useRequestURL().origin

useSeoMeta({
  ogUrl: `${host}/bookmark`,
  twitterTitle: title,
  twitterDescription: description,
  ogTitle: title,
  ogDescription: description,
  title,
  description,
})

const bookmarks = shallowRef<Bookmark[]>([])

onMounted(async () => {
  const data = await $fetch<string>('https://p.chilfish.top/bookmarks.html')
  bookmarks.value = await parseBookmark(data)
})
</script>

<template>
  <main class="w-full">
    <bookmark-item
      class="p-8"
      :bookmarks="bookmarks"
    />
  </main>
</template>
