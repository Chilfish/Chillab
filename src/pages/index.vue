<script setup lang="ts">
definePageMeta({
  redirect: '/test',
})

const links = ['/github', '/bookmark', '/titan', '/todo', '/auth', '/test', '/red']

const route = useRoute()
const path = computed(() => route.path)

const tabsRef = ref<HTMLElement[]>()
const curOffset = computed(() => {
  if (!tabsRef.value)
    return 0

  let idx = links.findIndex(link => link === path.value)
  if (idx < 0)
    idx = 0

  const curTab = tabsRef.value[idx]

  const tabWidth = curTab.clientWidth ?? 0
  const tabLeft = curTab.offsetLeft ?? 0
  const x = `${tabLeft + tabWidth / 2 - 12}px`

  const tabHeight = curTab.clientHeight ?? 0
  const tabTop = curTab.offsetTop ?? 0

  const y = `${tabTop + tabHeight + 8}px`

  return [x, y]
})

watchEffect(() => {
  useHead({
    title: `${path.value.slice(1)} | Chill Vue`,
  })
})
</script>

<template>
  <common-header />

  <ul class="relative mt-10 flex flex-wrap select-none gap-2 p-4">
    <li
      v-for="link in links"
      :key="link"
      ref="tabsRef"
    >
      <nuxt-link
        :to="link"
        :class="{
          'dark:bg-dark-3 bg-light-5': path === link,
        }"
        class="rounded-3 px-3 py-1 transition-colors duration-300"
        hover-bg="light-5 dark:dark-3"
      >
        {{ link }}
      </nuxt-link>
    </li>

    <span
      class="absolute left-0 top-0 h-[1px] w-6 rounded bg-blue trans-all"
      :style="{
        transform: `translate3D(${curOffset},0)`,
      }"
    />
  </ul>

  <div class="h-full w-full flex justify-center p-4">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>
