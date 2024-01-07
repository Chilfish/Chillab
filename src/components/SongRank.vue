<script setup lang="ts">
import type { NCMType, SongRecord } from '~/types'

const { records: recordsRef } = definePropsRefs<{
  records: SongRecord[] | null
  type: NCMType
}>()

const pic = computed(() => {
  if (!recordsRef.value)
    return '/avatar.png'
  return recordsRef.value[0]?.al.picUrl
})
</script>

<template>
  <section class="center-col">
    <header class="my-6 center gap-4">
      <div class="relative h-24 w-24 flex-shrink-0">
        <NuxtImg
          loading="lazy"
          placeholder="/placeholder.png"
          :src="pic"
          class="h-24 w-24 rounded-md"
        />
        <div class="absolute top-0 h-full w-full rounded-md bg-[#24242480]">
          <div class="i-tabler-heart h-full w-full text-light" />
        </div>
      </div>
      <p class="text-7 font-bold">
        {{ type === 'weekData' ? '周榜' : '总榜' }}
      </p>
    </header>

    <div
      v-if="records"
      class="flex flex-col gap-2"
    >
      <Song
        v-for="record, idx in records"
        :key="`song-${idx}-${record.id}`"
        :record="record"
        :idx="idx"
      />
    </div>

    <div
      v-else
      class="i-tabler-loader"
    />
  </section>
</template>
