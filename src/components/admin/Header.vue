<script setup lang="ts">
import { storeToRefs } from 'pinia'

const {
  isCollapse,
  curTitle,
} = storeToRefs(useAdminStore())

const toggleCollapse = useToggle(isCollapse)
</script>

<template>
  <header
    class="center justify-between p-4 gap-4 select-none"
    bg="light dark:dark-8"
    text="black dark:white"
  >
    <div class="center gap-4">
      <button
        :class="isCollapse
          ? 'i-tabler-layout-sidebar-left-collapse'
          : 'i-tabler-layout-sidebar-right-collapse'"
        @click="toggleCollapse()"
      />
      <p class="font-bold">
        {{ curTitle }}
      </p>
    </div>

    <div class="center gap-4">
      <span class="icon i-tabler-bell" />

      <button
        :class="dark ? 'i-tabler-moon' : 'i-tabler-sun'"
        @click="toggleDark()"
      />

      <admin-avatar
        avatar="https://avatars.githubusercontent.com/u/29767886?v=4"
        name="Chilfish"
      />
    </div>
  </header>
</template>
