<script setup lang="ts">
import Toast from '@cp/Toast'
</script>

<template>
  <button
    class="mr-[10rem]"
    @click="Toast('toastDefault.offset toastDefault.offset')"
  >
    Show Toast
  </button>
</template>
