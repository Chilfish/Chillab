<script setup lang="ts">
// thanks to https://vue-macros.sxzz.moe/features/reactivity-transform.html#reactive-props-destructure
// the props are now reactive
const {
  show = false,
} = defineProps<{
  show: boolean
}>()
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div
        v-show="show"
        v-bind="$attrs"
        class="fixed inset-0 z-999 h-full w-full center bg-black bg-opacity-50 backdrop-blur-4 transition-all duration-300"
        @click.self="() => $emit('update:show', false)"
      >
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<style>
.modal-enter-from ,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
