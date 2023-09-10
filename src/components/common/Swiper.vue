<script setup lang="ts">
const { imgs, autoPlay, duration } = withDefaults(defineProps<{
  imgs: string[]
  autoPlay?: boolean
  duration?: number
}>(), {
  autoPlay: true,
  duration: 5000,
})

defineEmits<{
  click?: [src: string]
}>()

const curImg = ref(0)
const offsetX = computed(() => `translateX(-${curImg.value * 100}%)`)

let timer: NodeJS.Timeout

function stop() {
  clearInterval(timer)
}

function start() {
  stop()
  timer = setInterval(() => {
    if (autoPlay)
      curImg.value = (curImg.value + 1) % imgs.length
  }, duration)
}

function next() {
  curImg.value = (curImg.value + 1) % imgs.length
  start()
}

function prev() {
  curImg.value = (curImg.value - 1 + imgs.length) % imgs.length
  start()
}

// these hooks will not be called when in SSR mode, but in <KeepAlive>
onActivated(start)
// stop the timer when deactivated in <KeepAlive>
onDeactivated(stop)

// so we also start it when mounted
onMounted(start)
onUnmounted(stop)
</script>

<template>
  <main
    class="relative h-130 w-90% cursor-pointer"
  >
    <button class="left-2" @click="prev">
      <span i-tabler-chevron-left />
    </button>

    <div class="h-full w-full flex overflow-hidden rounded-2">
      <div
        v-for="(img, i) in imgs"
        :key="i"
        class="h-full w-full flex-shrink-0 transition-transform duration-300 ease-in-out"
        bg="cover center"
        :style="{ backgroundImage: `url(${img})`, transform: offsetX }"
        @click="$emit('click', img)"
      />
    </div>

    <button class="right-2" @click="next">
      <span i-tabler-chevron-right />
    </button>

    <div
      class="absolute bottom-2 left-50% center translate-x--1/2 transform gap-3 rounded-2 px-3 py-2 blur-bg"
    >
      <span
        v-for="(_, i) in imgs"
        :key="i"
        :bg-opacity="curImg === i ? '100' : '30'"
        class="h-2 w-2 rounded-full bg-light-6 transition-colors duration-300 ease-in-out"
        @click="curImg = i"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
button {
  --uno: blur-bg icon-btn absolute top-50% z-10 text-white translate-y--1/2;
}
</style>
