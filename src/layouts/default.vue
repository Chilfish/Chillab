<script setup lang="ts">
const links = Object.keys(import.meta.glob('../pages/*.vue'))
  .map(file => file.replace('../pages', ''))
  .map(file => file.replace('.vue', ''))
  .filter(file => ['/index', '/[...all]'].includes(file) === false)
  .map(link => ({
    name: link.slice(1),
    path: link,
  }))

const route = useRoute()
const path = computed(() => route.path)

watchEffect(() => {
  useHead({
    title: `${path.value.slice(1)}`,
  })
})
</script>

<template>
  <Main-Header />

  <div class="mt-14" />

  <Tabs :links />

  <div class="h-full w-full flex justify-center p-4">
    <slot />
  </div>
</template>
