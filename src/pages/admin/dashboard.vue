<script lang="ts" setup>
useHead({
  title: 'Dashboard | Admin',
})
</script>

<template>
  <main
    class="w-full h-full"
  >
    <admin-header />

    <aside
      class="w-fit h-full"
    >
      <admin-menu />
    </aside>
  </main>
</template>
