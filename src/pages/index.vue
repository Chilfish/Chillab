<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const dark = useDark({
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(dark)

const links = ['/todo', '/github', '/post', '/titan', '/test']
</script>

<template>
  <div class="h-18 flex py-2 text-center">
    <h1 class="inline-block leading-13">
      Chill Vue Labs
    </h1>

    <button
      class="m-auto ml-8 h-10 rounded-3 px-4"
      @click="toggleDark()"
    >
      {{ dark ? 'Light' : 'Dark' }}
    </button>
  </div>

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
