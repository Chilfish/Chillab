<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const name = computed(_ => useRoute().params.name)
</script>

<template>
  <h1>name: {{ name }}</h1>
</template>
