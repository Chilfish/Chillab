<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'Toast',
})

// TODO
defineProps({
  message: {
    type: String,
    default: '',
  },
})

const show = ref(true)

function close() {
  show.value = false
}

onMounted(() => {
  setTimeout(() => close(), 3000)
})

defineExpose({
  show,
  close,
})
</script>

<template>
  <div
    v-if="show"
    class="toast"
  >
    {{ message }}
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 10rem;
  height: 3rem;
  text-align: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}
</style>
