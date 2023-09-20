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
      class=" h-full fixed top-0 left-0 z-10 select-none"
      bg="light dark:dark-5"
    >
      <div class="p-3 center gap-2">
        <img class="w-10 h-10 rounded-12" src="/favicon.ico">

        <nuxt-link
          v-show="!isCollapse"
          class="text-5 font-bold"
          to="/admin/dashboard"
        >
          Chill Admin
        </nuxt-link>
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
