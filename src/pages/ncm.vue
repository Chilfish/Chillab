<script setup lang="ts">
import type { SongRecord } from '~/types'

const { weekRecords } = storeToRefs(otherStore())

await callOnce('NCM', async () => {
  const { data } = await useFetch<SongRecord[]>('/api/ncm')
  weekRecords.value = data.value
})
</script>

<template>
  <main class="w-full center-col">
    <h3 class="mb-2">
      周排行
    </h3>

    <div
      v-if="weekRecords"
      class="flex flex-col gap-2"
    >
      <Song
        v-for="record, idx in weekRecords"
        :key="`song-${idx}-${record.id}`"
        :record="record"
        :idx="idx"
      />
    </div>
    <div
      v-else
      class="mt-auto"
    />
  </main>
</template>
