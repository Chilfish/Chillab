<script setup lang="ts">
import type { SongRecord } from '~/types'

useSeoMeta({
  title: '我的网易云音乐数据',
  description: '我的网易云音乐数据，包括每周听歌排行榜、听歌总排行榜、听歌总时长、听歌总数等',
})

const { weekRecords, allRecords } = storeToRefs(useOtherStore())

await callOnce(async () => {
  const [weekData, allData] = await Promise.all([
    !weekRecords.value && useFetch<SongRecord[]>('/api/ncm', { query: { type: 'weekData' } }),
    !allRecords.value && useFetch<SongRecord[]>('/api/ncm', { query: { type: 'allData' } }),
  ])

  weekData && (weekRecords.value = weekData.data.value)
  allData && (allRecords.value = allData.data.value)
})
</script>

<template>
  <main class="w-full center-col gap-4">
    <SongRank :records="weekRecords" type="weekData" />
    <SongRank :records="allRecords" type="allData" />
  </main>
</template>
