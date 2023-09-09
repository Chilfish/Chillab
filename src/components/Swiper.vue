<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const { imgs, autoPlay, duration } = withDefaults(defineProps<{
  imgs: string[]
  autoPlay?: boolean
  duration?: number
}>(), {
  autoPlay: true,
  duration: 5000,
})

const curImg = ref(0)
const offsetX = computed(() => `translateX(-${curImg.value * 100}%)`)

let timer: NodeJS.Timeout

function stop() {
  clearInterval(timer)
}

function start() {
  clearInterval(timer)
  timer = setInterval(() => {
    if (autoPlay)
      curImg.value = (curImg.value + 1) % imgs.length
  }, duration)
}

onMounted(start)
onUnmounted(stop)
</script>

<template>
  <main
    class="relative h-130 w-90%"
  >
    <button
      class="left-2"
      @click="curImg = (curImg - 1 + imgs.length) % imgs.length"
    >
      <span i-tabler-chevron-left />
    </button>

    <div class="h-full w-full flex overflow-hidden rounded-2">
      <div
        v-for="(img, i) in imgs"
        :key="i"
        class="h-full w-full flex-shrink-0 transition-transform duration-300 ease-in-out"
        bg="cover center"
        :style="{ backgroundImage: `url(${img})`, transform: offsetX }"
      />
    </div>

    <button
      class="right-2"
      @click="curImg = (curImg + 1) % imgs.length"
    >
      <span i-tabler-chevron-right />
    </button>

    <div
      class="absolute bottom-2 left-50% center gap-3 rounded-2 px-3 py-2 blur-bg"
    >
      <span
        v-for="(_, i) in imgs"
        :key="i"
        :bg-opacity="curImg === i ? '100' : '30'"
        class="h-2 w-2 cursor-pointer rounded-full bg-light-6 transition-colors duration-300 ease-in-out"
        @click="curImg = i"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
button {
  --uno: blur-bg absolute top-50% z-10 center rounded-full p-2 text-white;
}
</style>
