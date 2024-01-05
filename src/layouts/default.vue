<script setup lang="ts">
const links = ['/github', '/bookmark', '/titan', '/todo', '/auth', '/test', '/red', '/ncm']

const route = useRoute()
const path = computed(() => route.path)

watchEffect(() => {
  useHead({
    title: `${path.value.slice(1)} | Chill Vue`,
  })
})
</script>

<template>
  <Main-Header />

  <div class="mt-14" />

  <Tabs
    :links="links.map(link => ({
      name: link.slice(1),
      path: link,
    }))"
  />

  <div class="h-full w-full flex justify-center p-4">
    <slot />
  </div>
</template>
