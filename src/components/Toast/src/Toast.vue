<script setup lang="ts">
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { getLastOffset, getOffsetOrSpace } from './instance'
import { definePropType } from './props'

// import {toastProps} from './Toast'

defineOptions({
  name: 'Toast',
})
// TODO
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'info',
  },
  offset: {
    type: Number,
    default: 16,
  },
  onClose: {
    type: definePropType<() => void>(Function),
  },
  onDestroy: {
    type: definePropType<() => void>(Function),
  },
})

const show = ref(true)
const toastRef = ref<HTMLElement>()

const height = ref(0)
const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value)
const bottom = computed((): number => height.value + offset.value)

let stopTimer: (() => void) | undefined

function startTimer() {
  ({ stop: stopTimer } = useTimeoutFn(() => {
    close()
  }, 3000))
}

function close() {
  show.value = false
}

onMounted(() => {
  startTimer()
})

useResizeObserver(toastRef, () => {
  height.value = toastRef.value!.getBoundingClientRect().height
})

defineExpose({
  bottom,
  close,
})
</script>

<template>
  <transition
    name="fade"
    mode="out-in"
    @before-leave="onClose"
    @after-leave="onDestroy"
  >
    <div
      v-show="show"
      ref="toastRef"
      class="toast"
      :class="type"
      :style="{ top: `${offset}px` }"
      @mouseleave="startTimer"
      @mouseenter="stopTimer"
    >
      {{ message }}
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import '../style/index';
</style>
