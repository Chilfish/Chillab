<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { MenuItem } from '~/types'

const {
  isCollapse,
} = storeToRefs(useAdminStore())

const color = reactive({
  bg: useCssVar('--admin-menu-bg'),
  text: useCssVar('--admin-menu-text'),
})

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
    class="w-full h-full !border-none"
    :background-color="color.bg"
    :text-color="color.text"
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
