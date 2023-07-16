<script setup lang="ts">
const links = ['/todo', '/github']
</script>

<template>
  <h1> Chill Vue Labs </h1>

  <div
    v-for="link in links"
    :key="link"
    m-sm
  >
    <RouterLink
      :to="link"
      hover:text-blueGray-500
    >
      {{ link }}
    </RouterLink>
  </div>
</template>
