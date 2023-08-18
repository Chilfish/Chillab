<script setup lang="ts">
const links = ['/todo', '/github', '/post', '/titan', '/test']
</script>

<template>
  <h1> Chill Vue Labs </h1>

  <div class="mb-xl">
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
  </div>

  <RouterView />
</template>
