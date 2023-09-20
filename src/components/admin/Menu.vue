<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { MenuItem } from '~/types'

const {
  isCollapse,
} = storeToRefs(useAdminStore())

const items: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'i-tabler-dashboard',
    children: [
      {
        title: 'My Dashboard',
        link: '/admin/dashboard',
      },
    ],
  },
  {
    title: 'Home',
    icon: 'i-tabler-home',
    link: '/admin/home',
  },
  {
    title: 'Document',
    icon: 'i-tabler-file',
    link: '/admin/document',
  },
  {
    title: 'Settings',
    icon: 'i-tabler-settings',
    link: '/admin/settings',
  },
]
</script>

<template>
  <el-menu
    class="admin-menu h-full !border-none transition-all ease-in-out duration-300"
    background-color="bg-gray"
    text-color="text-gray"
    :collapse="isCollapse"
  >
    <admin-menu-item
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :index="index.toString()"
    />
  </el-menu>
</template>

<style>
.admin-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
