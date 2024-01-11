<script setup lang="ts">
import type { SongRecord } from '~/types'

useSeoMeta({
  title: 'Chilfish | 我的网易云音乐数据',
  description: 'Chilfish | 我的网易云音乐数据，包括每周听歌排行榜、听歌总排行榜、听歌总时长、听歌总数等',
})

const { weekRecords, allRecords } = storeToRefs(useOtherStore())

await callOnce(async () => {
  await Promise.all([
    !weekRecords.value
    && useFetch<SongRecord[]>('/api/ncm', { query: { type: 'weekData' } })
      .then((res) => {
        res && (weekRecords.value = res.data.value)
      }),

    !allRecords.value
    && useFetch<SongRecord[]>('/api/ncm', { query: { type: 'allData' } })
      .then((res) => {
        res && (allRecords.value = res.data.value)
      }),
  ])
})
</script>

<template>
  <main class="w-full center-col gap-4">
    <SongRank :records="weekRecords" type="weekData" />
    <SongRank :records="allRecords" type="allData" />
  </main>
</template>
