<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies()

cookies.set('token', 'John Doe')
</script>

<template>
  <main>
    {{ cookies.getAll() }}
  </main>
</template>
