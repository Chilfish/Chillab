<script setup lang="ts">
import { ref } from 'vue'
import { useDark, useMouse, useStorage, useTitle, useToggle } from '@vueuse/core'

const mouse = useMouse()

const title = ref(document.title)

// watch(title, (newTitle) => {
//   document.title = newTitle
// })

const isDark = useDark()
const toggleDark = useToggle(isDark)

useTitle(() => isDark.value ? '🌙 晚上好!' : '☀️ 早上好!')
useStorage('title', title)
</script>

<template>
  <input v-model="title">

  <pre>{{ mouse }}</pre>

  <button btn @click="toggleDark()">
    isDark: {{ isDark }}
  </button>
</template>
