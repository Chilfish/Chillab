<script setup lang="ts">
const title = 'Chill Vue Lab'
const img = '/avatar.png'

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
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <VitePwaManifest />
  <div class="h-full center-col justify-start">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
