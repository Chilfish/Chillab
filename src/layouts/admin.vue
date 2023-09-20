<script lang="ts" setup>
import { storeToRefs } from 'pinia'

useHead({
  title: 'Dashboard | Admin',
})

const {
  isCollapse,
} = storeToRefs(useAdminStore())

const asideWidth = computed(() => {
  return isCollapse.value ? '4rem' : '14rem'
})
</script>

<template>
  <div
    class="w-full h-full relative"
  >
    <aside
      :style="{ width: asideWidth }"
      class=" h-full fixed top-0 left-0 z-10"
      bg="light dark:dark-5"
    >
      <div class="p-3 center gap-4">
        <img class="w-10 h-10 rounded-12" src="/favicon.ico">
        <h2 v-show="!isCollapse" class="text-5">
          Chill Admin
        </h2>
      </div>

      <client-only>
        <admin-menu />
      </client-only>
    </aside>

    <admin-header :style="{ marginLeft: asideWidth }" />

    <main
      :style="{ marginLeft: asideWidth }"
      class="h-full center-col"
    >
      <slot />
    </main>
  </div>
</template>
