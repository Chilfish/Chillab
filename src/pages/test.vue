<script setup lang="ts">
import Toast from '@cp/Toast'
</script>

<template>
  <button @click="Toast('hello')">
    Show Toast
  </button>

  <button @click="Toast({ message: 'hello 233' })">
    Show
  </button>
</template>
