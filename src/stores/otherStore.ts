import type { Bookmark, SongRecord } from '~/types'

export const useOtherStore = defineStore('other', () => {
  const weekRecords = ref<SongRecord[] | null>(null)
  const allRecords = ref<SongRecord[] | null>(null)

  const bookmarks = ref<Bookmark[] | null>(null)

  return {
    weekRecords,
    allRecords,
    bookmarks,
  }
})
