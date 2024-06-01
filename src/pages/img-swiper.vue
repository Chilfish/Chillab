<script setup lang="ts">
const imgs = [
  '/ender-girls.jpg',
  '/ender-bocchi.webp',
  '/kurarin.webp',
]

const clicked = ref('')
</script>

<template>
  <Swiper
    :imgs
    @click="clicked = $event"
  />

  <ImgPreviewer
    :src="clicked"
    @close="clicked = ''"
  />
</template>
