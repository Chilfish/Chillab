<script setup lang="ts">
import { appName } from '~/constants'
</script>

<template>
  <header
    class="fixed top-0 z-999 h-12 w-full flex select-none items-center justify-between gap-4 p-2 text-center transition-all blur-bg"
  >
    <h2
      class="inline-block text-transparent"
      bg="gradient-to-r clip-text"
      from="blue-400 dark:blue-500"
      to="purple-500 dark:purple-600"
    >
      <router-link to="/">
        {{ appName }}
      </router-link>
    </h2>

    <slot />

    <button
      i-tabler="moon dark:sun"
      hover="opacity-80"
      @click="toggleDark()"
    />
  </header>
</template>
