<script setup lang="ts">
useSeoMeta({
  ogUrl: useRoute().fullPath,
  twitterTitle: 'Chill Vue Lab',
  twitterDescription: 'Chill Vue Lab',
  twitterImage: '/favicon.ico',
  twitterCard: 'summary',
  ogImage: '/favicon.ico',
  ogDescription: 'Chill Vue Lab',
  ogTitle: 'Chill Vue Lab',
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
