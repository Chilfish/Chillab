<script setup lang="ts">
const title = 'Chill Vue Lab'
const img = 'https://chilfish.top/avatar.png'

useSeoMeta({
  ogUrl: useRoute().fullPath,
  twitterTitle: title,
  twitterDescription: title,
  twitterImage: img,
  twitterCard: 'summary_large_image',
  ogImage: img,
  ogDescription: title,
  ogTitle: title,
  title,
  description: title,
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <div class="center-col h-full justify-start">
    <NuxtLayout>
      <!-- <ClientOnly> -->
      <NuxtPage />
      <!-- </ClientOnly> -->
    </NuxtLayout>
  </div>
</template>
