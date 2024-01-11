<script setup lang="ts">
const {
  src,
} = definePropsRefs<{
  src: string
}>()

const color = ref({
  hex: '#000000',
  text: '#ffffff',
  rgb: [0, 0, 0],
})

onBeforeMount(async () => {
  const { hex, text, rgb } = await imgTheme(src.value)

  color.value = {
    hex,
    text,
    rgb,
  }
  console.log(color.value)
})
</script>

<template>
  <div
    class="center-col gap-4 rounded px-6 py-4"
    :style="{
      color: color.text,
      backgroundColor: color.hex,
      boxShadow: `0 10px 50px 5px rgb(${color.rgb}, 0.3)`,
    }"
  >
    <NuxtImg
      class="rounded-lg shadow-lg"
      :src="src"
    />

    <p>
      <span class="font-bold">Hex:</span>
      <span class="ml-1 font-mono">{{ color.hex }}</span>
    </p>
  </div>
</template>
