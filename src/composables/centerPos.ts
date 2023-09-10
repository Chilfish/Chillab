import type { MaybeRefOrGetter } from 'vue'

/**
 * Returns the center position of the absolute element (top, left)
 */
export function useCenterPos(el: MaybeRefOrGetter<HTMLElement>) {
  const elValue = toValue(el)
  const { width, height } = useWindowSize()

  const offsetWidth = computed(() => elValue.offsetWidth)
  const offsetHeight = computed(() => elValue.offsetHeight)

  const y = computed(() => (height.value - offsetHeight.value) / 2)
  const x = computed(() => (width.value - offsetWidth.value) / 2)

  const string = computed(() => `${y.value}px; ${x.value}px;`)

  return {
    x,
    y,
    string,
  }
}
