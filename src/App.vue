<script setup lang="ts">
import { appDescription, appName } from '~/constants'

const img = '/avatar.png'

useSeoMeta({
  ogUrl: useRoute().fullPath,
  twitterTitle: appName,
  twitterDescription: appDescription,
  twitterImage: img,
  twitterCard: 'summary_large_image',
  ogImage: img,
  ogDescription: appDescription,
  ogTitle: appName,
  title: appName,
  description: appName,
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
  <NuxtLoadingIndicator />
  <div class="h-full center-col justify-start">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
