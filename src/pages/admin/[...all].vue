<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const title = computed(() => (useRoute().params.all as string[]).join('/'))
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>
