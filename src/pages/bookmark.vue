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
