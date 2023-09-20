<script setup lang="ts">
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'admin',
})

const {
  curTitle,
} = storeToRefs(useAdminStore())
</script>

<template>
  <div>
    <h1>
      {{ curTitle }}
    </h1>
  </div>
</template>
