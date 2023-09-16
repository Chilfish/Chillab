<script setup lang="ts">
const links = ['/github', '/titan', '/todo', '/test', '/red']

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
  return tabLeft + tabWidth / 2 - 12
})
</script>

<template>
  <common-header />

  <ul class="relative mb-6 mt-16 flex select-none gap-1">
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
      class="absolute bottom--2 left-0 h-[1px] w-6 rounded bg-blue transition-transform duration-300 ease-in-out"
      :style="{
        transform: `translateX(${curOffset}px)`,
      }"
    />
  </ul>

  <div class="h-full w-full p-4 flex justify-center">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>
