<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

const { x, y } = useMouse()
const eye = ref<HTMLElement>()
const damping = 0.1
const edge = 10 // px

watchEffect(() => {
  if (!eye.value)
    return

  const eyeX = eye.value.offsetLeft + eye.value.offsetWidth / 2 // horizontal middle
  const eyeY = eye.value.offsetTop + eye.value.offsetHeight * 0.3 // vertical middle up

  let translateX = (x.value - eyeX) * damping
  let translateY = (y.value - eyeY) * damping

  const distance = Math.sqrt(translateX ** 2 + translateY ** 2)
  if (distance > edge) {
    const angle = Math.atan2(translateY, translateX)
    translateX = Math.cos(angle) * edge
    translateY = Math.sin(angle) * edge
  }

  eye.value.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`
})
</script>

<template>
  <main
    class="algin-center relative h-full w-full flex justify-center overflow-hidden bg-[#534E48] p-xl"
  >
    <div ref="eye" class="eye" />
    <div class="bg" />
  </main>
</template>

<style lang="scss" scoped>
main {
  div {
    @apply absolute top-0 left-0 bg-no-repeat bg-center bg-contain h-full w-full;
  }

  .bg {
    background-image: url('/Titan_bg.png');
  }

  .eye {
    background-image: url('/Titan_eye.png');
    transform-origin: 50% 50%;
    transition: transform 0.1s ease-in-out;
  }
}
</style>
