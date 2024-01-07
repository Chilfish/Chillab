<script setup lang="ts">
defineProps<{
  show: boolean
}>()

const emits = defineEmits<{
  'update:show': [show: boolean]
}>()
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div
        v-show="show"
        v-bind="$attrs"
        class="fixed inset-0 z-9999 h-full w-full center bg-black bg-opacity-50 backdrop-blur-4 transition-all duration-300"
        @click.self="() => emits('update:show', false)"
      >
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<style>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
