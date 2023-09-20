<script setup lang="ts">
import { storeToRefs } from 'pinia'

const {
  isCollapse,
} = storeToRefs(useAdminStore())

const toggleCollapse = useToggle(isCollapse)

const title = computed(() => (useRoute().params.all as string[]).join('/'))
</script>

<template>
  <header
    class="center justify-between p-4 gap-4 select-none"
    bg="light dark:dark-8"
  >
    <div class="center gap-4">
      <button
        :class="isCollapse
          ? 'i-tabler-layout-sidebar-left-collapse'
          : 'i-tabler-layout-sidebar-right-collapse'"
        @click="toggleCollapse()"
      />
      <p class="font-bold">
        {{ title }}
      </p>
    </div>

    <button
      :class="dark ? 'i-tabler-moon' : 'i-tabler-sun'"
      @click="toggleDark()"
    />
  </header>
</template>
