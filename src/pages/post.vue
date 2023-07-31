<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const darkStyle = computed(() => isDark.value
  ? {
      navBg: '#2228',
      icon: 'i-carbon-sun',
    }
  : {
      navBg: '#fffc',
      icon: 'i-carbon-moon',
    },
)
</script>

<template>
  <nav :style="{ backgroundColor: darkStyle.navBg }">
    <div>
      <img class="logo" src="/favicon.ico">
      <span>Chill Post</span>
    </div>

    <span :class="darkStyle.icon" @click="toggleDark()" />
  </nav>
  <header>
    <h1>Post</h1>
  </header>
  <main>
    <ul>
      <li v-for="i in 10" :key="i">
        <p>Post {{ i }}</p>
        <img src="https://pbs.twimg.com/media/F2XC05LaEAEYlDf.jpg" alt="image">
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
nav {
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  position: sticky;
  top: 0;
  backdrop-filter: blur(24px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img.logo {
    padding: 0.3rem;
    margin-right: 1rem;
    height: 100%;
    border-radius: 12px;
  }
}

main {
  img {
    height: 300px;
    border-radius: 8px;
  }
}
</style>
