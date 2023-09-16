<script setup lang="ts">
// useTitle('404 Not Found')
</script>

<template>
  <div class="center-col select-none justify-start gap-4">
    <h1>404 URL {{ $route.fullPath }}</h1>
    <p>Page not found</p>

    <nuxt-link class="btn" to="/">
      Go back
    </nuxt-link>
  </div>
</template>
