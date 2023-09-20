export function useCssVar(name: string) {
  const val = ref('')

  watch(dark, async () => {
    if (document) {
      // have to wait for next tick to get the updated value
      await nextTick()
      val.value = getComputedStyle(document.documentElement).getPropertyValue(name)
    }
  }, {
    immediate: true,
  })

  return val
}
