<script setup lang="ts">
import type { SongRecord } from '~/types'
import { fetchMusic } from '~/utils/ncm'

useSeoMeta({
  title: 'Chilfish | 我的网易云音乐数据',
})

const weekRecords = shallowRef<SongRecord[]>([])

onMounted(async () => {
  weekRecords.value = await fetchMusic('weekData')
})
</script>

<template>
  <main class="w-full center-col gap-4">
    <SongRank
      :records="weekRecords"
      type="weekData"
    />
  </main>
</template>
