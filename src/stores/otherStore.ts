import type { SongRecord } from '~/types'

export const otherStore = defineStore('other', () => {
  const weekRecords = ref<SongRecord[] | null>(null)
  const allRecords = ref<SongRecord[] | null>(null)

  return {
    weekRecords,
    allRecords,
  }
})
