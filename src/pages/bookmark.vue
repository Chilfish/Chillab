<script setup lang="ts">
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

const { bookmarks } = storeToRefs(useOtherStore())

await callOnce(async () => {
  if (!bookmarks.value) {
    const { data } = await useFetch<string>('https://chilf.vercel.app/bookmarks.html')
    bookmarks.value = data.value ? await parseBookmark(data.value) : null
  }
})
</script>

<template>
  <main class="w-full">
    <div
      v-if="!bookmarks"
      class="text-center text-5 font-bold"
    >
      Loading
    </div>

    <bookmark-item
      v-else
      class="p-8"
      :bookmarks="bookmarks"
    />
  </main>
</template>
