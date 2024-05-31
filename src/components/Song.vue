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
    class="song"
    :bg="`${idx % 2 === 0 ? '#f7f9fc dark:dark-6' : '#f7f5f7 dark:dark-7'}`"
    :hover-bg="`${idx % 2 !== 0 ? '#f7f5f7 dark:dark-7' : '#f7f9fc dark:dark-6'}`"
    :to="`https://music.163.com/song?id=${record.id}`"
    :no-prefetch="true"
    :no-rel="true"
    target="_blank"
    referrerpolicy="no-referrer"
  >
    <div> {{ index }} </div>

    <div class="h-12 w-12 flex-shrink-0">
      <NuxtImg
        loading="lazy"
        placeholder="/placeholder.png"
        class="h-12 w-12 rounded-md"
        :alt="record.name"
        :src="record.al.picUrl"
      />
    </div>

    <div class="flex flex-col gap-1">
      <div text="4 gray-9 dark:light-7 truncate">
        {{ record.name }}
      </div>

      <div class="mt-2 truncate">
        {{ record.ar.map((a) => a.name).join(', ') }}
        -
        {{ record.al.name }}
      </div>
    </div>

    <div class="ml-auto min-w-fit flex items-center justify-end">
      <div> {{ durantion }}  </div>
      <div v-if="record.playCount">
        •{{ record.playCount }} 次
      </div>
    </div>
  </nuxt-link>
</template>

<style scoped>
.song {
  --white-1: #f7f9fc;
  --white-2: #f7f5f7;

  @apply: text-gray-5 dark:text-light-4 h-18 w-90vw flex items-center justify-between gap-3 rounded-md px-3 py-2 text-3 sm:w-40rem sm:text-3.5;
}
</style>
