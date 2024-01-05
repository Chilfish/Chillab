<script setup lang="ts">
import type { SongRecord } from '~/types'

const { weekRecords, allRecords } = storeToRefs(otherStore())

onNuxtReady(async () => {
  if (weekRecords.value)
    return

  const [weekData, allData] = await Promise.all([
    useFetch<SongRecord[]>('/api/ncm', { query: { type: 'weekData' } }),
    useFetch<SongRecord[]>('/api/ncm', { query: { type: 'allData' } }),
  ])
  weekRecords.value = weekData.data.value
  allRecords.value = allData.data.value
})
</script>

<template>
  <main class="w-full center-col gap-4">
    <SongRank :records="weekRecords" type="weekData" />
    <SongRank :records="allRecords" type="allData" />
  </main>
</template>
