<script setup lang="ts">
import type { MenuItem } from '~/types'

const {
  item,
  index,
} = defineProps<{
  item: MenuItem
  index: string
}>()
</script>

<template>
  <el-menu-item
    v-if="!item.children"
    :index="index"
  >
    <el-icon v-if="item.icon">
      <span :class="`icon ${item.icon}`" />
    </el-icon>

    <template #title>
      {{ item.title }}
    </template>
  </el-menu-item>

  <el-sub-menu
    v-else
    :index="index"
  >
    <template #title>
      <el-icon v-if="item.icon">
        <span :class="`icon ${item.icon}`" />
      </el-icon>
      <span>{{ item.title }}</span>
    </template>

    <admin-menu-item
      v-for="(child, cIndex) in item.children"
      :key="cIndex"
      :item="child"
      :index="`${index}-${cIndex}`"
    />
  </el-sub-menu>
</template>
