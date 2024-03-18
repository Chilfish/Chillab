<script setup lang="ts">
import { appDescription, appName } from '~/constants'

const host = useRequestURL().origin
const img = `${host}/favicon.ico`

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

const route = useRoute()

const { client } = route.meta as {
  client: boolean
}
</script>

<template>
  <div class="h-full center-col justify-start">
    <NuxtLayout>
      <NuxtLoadingIndicator />

      <ClientOnly v-if="client">
        <NuxtPage />
      </ClientOnly>

      <NuxtPage v-else />
    </NuxtLayout>
  </div>
</template>
