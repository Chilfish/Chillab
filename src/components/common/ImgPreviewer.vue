<script setup lang="ts">
import { UseDraggable } from '@vueuse/components'

const show = ref(false)
const scaleRatio = ref(1)
const imgRef = ref<HTMLImageElement>()
const pos = ref({ x: 0, y: 0 })

function toggle() {
  show.value = !show.value
  scaleRatio.value = 1
  if (!show.value)
    imgPreviewUrl.value = emptyImg
}

function download() {
  const a = document.createElement('a')
  a.href = imgPreviewUrl.value
  a.download = imgPreviewUrl.value
  a.click()
  a.remove()
}

function openInNewTab() {
  window.open(imgPreviewUrl.value, '_blank')
}

watch(imgPreviewUrl, (v) => {
  if (v !== emptyImg)
    return toggle()

  if (imgRef.value) {
    const { x, y } = useCenterPos(imgRef.value)
    pos.value = { x: x.value, y: y.value }
  }
})
</script>

<template>
  <Modal
    v-if="show"
    id="imgPreviewer"
    :show="show"
    class="group"
    @update:show="toggle"
  >
    <div class="absolute top-0 z-20 w-full flex select-none justify-between p-4 text-white">
      <button
        class="icon-btn p-3 blur-bg"
        @click="toggle"
      >
        <span class="i-tabler-x icon" />
      </button>

      <div
        class="center rounded-2 px-4 py-2 blur-bg"
        gap="2 sm:4"
      >
        <button
          class="i-tabler-zoom-out icon"
          @click="scaleRatio > 0.11 ? scaleRatio -= 0.1 : null"
          @disabled="scaleRatio <= 0.11"
        />

        <span>{{ (scaleRatio * 100).toFixed(0) }}%</span>

        <button
          class="i-tabler-zoom-in icon"
          @click="scaleRatio < 2 ? scaleRatio += 0.1 : null"
          @disabled="scaleRatio >= 2"
        />

        <span class="text-gray">|</span>

        <button
          class="i-tabler-arrows-maximize icon"
          @click="scaleRatio = 1"
        />

        <span class="text-gray">|</span>

        <button
          class="i-tabler-download icon"
          @click="download"
        />

        <span class="text-gray">|</span>

        <button @click="openInNewTab">
          Origin
        </button>
      </div>
    </div>

    <UseDraggable
      class="absolute w-80%"
      :initial-value="{ x: pos.x, y: pos.y }"
    >
      <img
        ref="imgRef"
        class="h-auto w-full rounded-2"
        bg="center cover"
        draggable="false"
        :cursor="scaleRatio > 1 ? 'grab' : 'default'"
        :src="imgPreviewUrl"
        :alt="imgPreviewUrl"
        :style="`transform: scale(${scaleRatio});`"
      >
    </UseDraggable>
  </Modal>
</template>
