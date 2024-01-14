<script setup lang="ts">
import { appDescription, appName } from '~/constants'

const host = useRequestURL().origin
const img = `${host}/avatar.png`

useSeoMeta({
  ogUrl: host,
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
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <VitePwaManifest />

  <div class="h-full center-col justify-start">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
