<script setup lang="ts">
useHead({
  title: '404 Not Found',
})
</script>

<template>
  <div class="center-col select-none justify-start gap-4">
    <h1>404 URL {{ $route.fullPath }}</h1>
    <p>Page not found. Try to refresh to redirect manually</p>

    <div class="center gap-4">
      <nuxt-link class="btn" to="/">
        Go back
      </nuxt-link>

      <button
        class="btn"
        @click="$router.go(0)"
      >
        Refresh
      </button>
    </div>
  </div>
</template>
