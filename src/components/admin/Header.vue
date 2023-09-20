<script setup lang="ts">
import { storeToRefs } from 'pinia'

const {
  isCollapse,
} = storeToRefs(useAdminStore())

const toggleCollapse = useToggle(isCollapse)
</script>

<template>
  <header
    class="center justify-between p-4 gap-4"
    bg="light dark:dark-8"
  >
    <button
      :class="isCollapse
        ? 'i-tabler-layout-sidebar-left-collapse'
        : 'i-tabler-layout-sidebar-right-collapse'"
      @click="toggleCollapse()"
    />

    <button
      :class="dark ? 'i-tabler-moon' : 'i-tabler-sun'"
      @click="toggleDark()"
    />
  </header>
</template>
