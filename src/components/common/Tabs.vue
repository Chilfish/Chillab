<script setup lang="ts">
import { withDefaults } from 'unplugin-vue-macros/macros' assert { type: 'macro' }

const {
  links,
  type,
} = withDefaults(definePropsRefs<{
  links: {
    name: string
    path: string
  }[]
  type?: 'path' | 'hash'
}>(), {
  type: 'path',
})

const route = useRoute()
const path = computed(() => type.value === 'path' ? route.path : route.hash)

const tabsRef = ref<HTMLElement[]>()

/**
 * Get the offset of the current tab, and return it as a string.
 */
const curOffset = computed(() => {
  if (!tabsRef.value)
    return ['0px', '0px']

  let idx = links.value.findIndex(link => link.path === path.value)
  if (idx < 0)
    idx = 0

  const curTab = tabsRef.value[idx]

  const tabWidth = curTab.clientWidth ?? 0
  const tabLeft = curTab.offsetLeft ?? 0
  const x = `${tabLeft + tabWidth / 2 - 12}px`

  const tabHeight = curTab.clientHeight ?? 0
  const tabTop = curTab.offsetTop ?? 0

  const y = `${tabTop + tabHeight + 6}px`

  return [x, y]
})
</script>

<template>
  <ul
    class="relative flex flex-wrap select-none gap-2 px-4 py-2"
  >
    <li
      v-for="link in links"
      :key="link.path"
      ref="tabsRef"
    >
      <nuxt-link
        :to="link.path"
        :class="{
          'dark:bg-dark-3 bg-light-5': path === link.path,
        }"
        class="rounded-3 px-3 py-1 transition-colors duration-300"
        hover-bg="light-5 dark:dark-3"
      >
        {{ link.name }}
      </nuxt-link>
    </li>

    <span
      class="absolute left-0 top-0 h-[1px] w-6 rounded bg-blue trans-all"
      :style="{
        transform: `translate3D(${curOffset},0)`,
      }"
    />
  </ul>
</template>
