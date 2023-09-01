<script setup lang="ts">
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { getLastOffset, getOffsetOrSpace } from './instance'
import { toastProps } from './props'

defineOptions({
  name: 'Toast',
})

const props = defineProps(toastProps)

const show = ref(true)
const toastRef = ref<HTMLElement>()
const height = ref(0)
// 上一个 Toast 的底部位置
const lastOffset = computed(() => getLastOffset(props.id))

// 这个 Toast 的 offset 就等于 上一个 bottom + 固定 offset
const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value)

// 这个 Toast 的底部位置
const bottom = computed((): number => height.value + offset.value)

useResizeObserver(toastRef, () => {
  // 获取 Toast 的高度
  height.value = toastRef.value!.getBoundingClientRect().height
})

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
