<script setup lang="ts">
import type { SongRecord } from '~/types'

const { record, idx } = definePropsRefs<{
  record: SongRecord
  idx: number
}>()

const durantion = computed(() => {
  const raw = record.value.dt
  const minutes = Math.floor(raw / 1000 / 60)
  const seconds = Math.floor(raw / 1000) % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const index = computed(() => {
  const raw = idx.value + 1
  return raw < 10 ? `0${raw}` : raw
})
</script>

<template>
  <nuxt-link
    class="gray-5 dark:light-4 h-18 w-90vw flex items-center justify-between rounded-md px-4 py-2 text-sm"
    sm="w-40rem"
    :bg="`${idx % 2 === 0 ? '#f7f9fc dark:dark-6' : '#f7f5f7 dark:dark-7'}`"
    :to="`https://music.163.com/song?id=${record.id}`"
    target="_blank"
    referrerpolicy="no-referrer"
  >
    <div class="flex items-center space-x-3">
      <div> {{ index }} </div>

      <div class="h-12 w-12 flex-shrink-0">
        <img
          :src="record.al.picUrl"
          class="h-12 w-12 rounded-md"
        >
      </div>

      <div
        sm="max-w-24rem"
        md="max-w-26rem"
        class="max-w-8rem flex flex-col gap-1"
      >
        <div text="4 gray-9 dark:light-7 truncate">
          {{ record.name }}
        </div>

        <div class="mt-2 truncate">
          {{ record.ar.map((a) => a.name).join(', ') }}
          -
          {{ record.al.name }}
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <div> {{ durantion }} • </div>
      <div> {{ record.playCount }} 次 </div>
    </div>
  </nuxt-link>
</template>
