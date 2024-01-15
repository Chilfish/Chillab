<script setup lang="ts">
useSeoMeta({
  title: 'Chilfish | 我的网易云音乐数据',
  description: 'Chilfish | 我的网易云音乐数据，包括每周听歌排行榜、听歌总排行榜、听歌总时长、听歌总数等',
})

const otherStore = useOtherStore()

await callOnce(otherStore.fetchRecords)
</script>

<template>
  <main class="w-full center-col gap-4">
    <SongRank
      :records="otherStore.weekRecords"
      type="weekData"
    />
    <SongRank
      :records="otherStore.allRecords"
      type="allData"
    />
  </main>
</template>
