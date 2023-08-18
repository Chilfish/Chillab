<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'Toast',
})
const show = ref(true)
const message = ref('213123')

onMounted(() => {
  setTimeout(() => {
    show.value = false
  }, 3000)
})
</script>

<template>
  <div v-if="show" class="toast">
    {{ message }}
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  width: 10rem;
  height: 3rem;
  text-align: center;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}
</style>
