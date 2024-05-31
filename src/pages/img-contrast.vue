<script setup lang="ts">
const before = '/ender-girls.jpg'
const after = '/ender-bocchi.webp'

const contrast = ref(0.5)

const postion = computed(() => `${contrast.value * 100}%`)
</script>

<template>
  <main
    class="relative grid w-70% flex-1 place-content-center overflow-hidden"
  >
    <div class="relative h-sm rounded-xl bg-dark-7">
      <NuxtImg
        loading="lazy"
        placeholder="/placeholder.png"
        class="relative z-100 h-full rounded-xl object-cover object-left"
        :src="before"
        :style="{ width: postion }"
      />
      <NuxtImg
        loading="lazy"
        placeholder="/placeholder.png"
        :src="after"
        class="absolute inset-0 z-10 h-full w-full rounded-xl object-cover object-left"
      />

      <div id="slider">
        <div
          id="slider-button"
          aria-hidden="true"
          :style="{ left: postion }"
          class="pointer-events-none absolute absolute top-1/2 z-200 z-200 grid place-items-center rounded-full bg-white/50 p-3 backdrop-blur-xl -translate-x-1/2 -translate-y-1/2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 32 32" class="iconify iconify--carbon"><path fill="currentColor" d="M12 4v11H5.83l2.58-2.59L7 11l-5 5l5 5l1.41-1.41L5.83 17H12v11h2V4zm13 7l-1.41 1.41L26.17 15H20V4h-2v24h2V17h6.17l-2.58 2.59L25 21l5-5z" /></svg>
        </div>

        <div
          id="slider-line"
          :style="{ left: postion }"
          class="pointer-events-none absolute inset-0 z-10 z-200 w-1 rounded-full bg-white/50 backdrop-blur-xl"
        />
      </div>

      <input
        v-model="contrast"
        class="absolute absolute left-0 top-0 z-200 h-full w-full opacity-0"
        type="range" min="0" max="1" step="0.01"
      >
    </div>
  </main>
</template>
