<script setup lang="ts">
defineProps<{
  avatar: string
  name: string
}>()
</script>

<template>
  <el-dropdown>
    <div class="center gap-2">
      <el-avatar :src="avatar" size="small" />
      <p text="black dark:white">
        {{ name }}
      </p>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          @click="(e) => console.log(e)"
        >
          <span class="icon mr-2 i-tabler-logout" />
          <span>Logout</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
