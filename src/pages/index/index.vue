<script setup lang="ts">
const links = ['/todo', '/github', '/titan', '/test']
</script>

<template>
  <Header />

  <ul class="mb-xl mt-18 select-none">
    <span
      v-for="link in links"
      :key="link"
      class="m-sm"
    >
      <RouterLink
        :to="link"
        class="hover:text-blueGray-500"
      >
        {{ link }}
      </RouterLink>
    </span>
  </ul>

  <RouterView />
</template>
