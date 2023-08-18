<script setup lang="ts">
import Toast from '@cp/Toast'
import { getCurrentInstance } from 'vue'

const context = getCurrentInstance()?.appContext

function show() {
  Toast('hello', context)
}
</script>

<template>
  <button @click="show">
    Show Toast
  </button>
</template>
