<script setup lang="ts">
useTitle('404 Not Found')
</script>

<template>
  <div class="center-col select-none justify-start gap-4">
    <h1>404 URL {{ $route.fullPath }}</h1>
    <p>Page not found</p>

    <RouterLink class="btn" to="/">
      Go back
    </RouterLink>
  </div>
</template>
