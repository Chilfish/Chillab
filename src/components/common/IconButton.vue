<script setup lang="ts">
defineProps<{
  text: string
  type?: 'button' | 'submit' | 'reset'
  icon?: string // i-tabler-{icon}
  showIcon?: boolean
}>()

defineEmits(['click'])
</script>

<template>
  <button
    :type="type || 'button'"
    class="gap-2 btn center!"
    @click="$emit('click')"
  >
    <span
      v-if="showIcon"
      class="icon"
      :class="icon"
    />
    <span> {{ text }} </span>
  </button>
</template>
