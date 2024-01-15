<script setup lang="ts">
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

const otherStore = useOtherStore()

await callOnce(otherStore.fetchBookmarks)
</script>

<template>
  <main class="w-full">
    <bookmark-item
      class="p-8"
      :bookmarks="otherStore.bookmarks"
    />
  </main>
</template>
