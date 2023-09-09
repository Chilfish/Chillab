<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { watch } from 'vue'
import { emptyImg, imgPreviewUrl } from '~/composables/imgPreview'

const [show, toggle] = useToggle(false)

watch(imgPreviewUrl, (v) => {
  if (v !== emptyImg)
    toggle()
})
</script>

<template>
  <Modal
    id="imgPreviewer"
    v-model:show="show"
    @update:show="toggle"
  >
    <div>
      <img :src="imgPreviewUrl" alt="img">
    </div>
  </Modal>
</template>
