<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const dark = useDark({
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(dark)
</script>

<template>
  <header
    class="fixed top-0 z-999 h-12 w-full flex select-none items-center justify-between gap-4 bg-[#69696A30] p-2 text-center backdrop-blur-8 transition-all"
  >
    <h2 class="inline-block leading-13">
      <router-link to="/">
        Chill Vue Labs
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
