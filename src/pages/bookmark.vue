<script setup lang="ts">
import type { Bookmark } from '~/types'

const title = 'Chilfish\'s Bookmarks'
const description = 'Chilfish\'s online bookmarks, you can find some useful websites here and parse your bookmarks at /test#Bookmarks.'

useSeoMeta({
  ogUrl: '/bookmark',
  twitterTitle: title,
  twitterDescription: description,
  ogTitle: title,
  ogDescription: description,
  title,
  description,
})

const { data } = useFetch<string>('https://chilf.vercel.app/bookmarks.html')

const bookmark = ref<Bookmark[]>([])

onMounted(() => {
  bookmark.value = data.value ? parseBookmark(data.value) : []
})
</script>

<template>
  <main class="w-full">
    <bookmark-item
      class="p-8"
      :bookmarks="bookmark"
    />
  </main>
</template>
