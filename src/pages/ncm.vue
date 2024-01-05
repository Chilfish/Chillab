<script setup lang="ts">
import type { SongRecord } from '~/types'

const { weekRecords, allRecords } = storeToRefs(otherStore())

onNuxtReady(async () => {
  // make sure the data is fetched by once

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
