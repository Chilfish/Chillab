<script setup lang="ts">
const props = defineProps<{
  src: string
}>()

const color = ref({
  hex: '#000000',
  text: '#ffffff',
  rgb: [0, 0, 0],
})

const src = ref(props.src)
const fileInput = ref<HTMLInputElement | null>(null)

function onSelectFile(file: File) {
  src.value = URL.createObjectURL(file)
}

async function setImgTheme() {
  const { hex, text, rgb } = await imgTheme(src.value)

  color.value = {
    hex,
    text,
    rgb,
  }
}

watchImmediate(src, setImgTheme)
</script>

<template>
  <div
    class="center-col rounded px-8 py-6 trans-all"
    :style="{
      color: color.text,
      background: `linear-gradient(to top, rgb(${color.rgb}, 0.7), rgb(${color.rgb}))`,
      boxShadow: `0 10px 50px 5px rgb(${color.rgb}, 0.3)`,
    }"
  >
    <input
      ref="fileInput"
      class="hidden h-full w-full"
      type="file"
      accept="image/*"
      @change="(e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file)
          return
        onSelectFile(file)
      }"
    >

    <NuxtImg
      class="mb-2 cursor-pointer rounded-lg shadow-lg"
      :width="350"
      :src="src"
      :alt="`Image with theme ${color.hex}`"
      @click="() => fileInput?.click()"
    />

    <div class="text-center">
      <p>
        <span class="font-bold">Hex:</span>
        <span class="ml-1 font-mono">{{ color.hex }}</span>
      </p>
      <p class="text-3">
        Click Image to change
      </p>
    </div>
  </div>
</template>
