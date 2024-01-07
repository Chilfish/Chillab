import type { Bookmark, SongRecord } from '~/types'

export const useOtherStore = defineStore('other', () => {
  const weekRecords = shallowRef<SongRecord[] | null>(null)
  const allRecords = shallowRef<SongRecord[] | null>(null)

  const bookmarks = shallowRef<Bookmark[] | null>(null)

  return {
    weekRecords,
    allRecords,
    bookmarks,
  }
})
