import type { Bookmark, SongRecord } from '~/types'

export const useOtherStore = defineStore('other', () => {
  const weekRecords = shallowRef<SongRecord[]>([])
  const allRecords = shallowRef<SongRecord[]>([])

  const bookmarks = shallowRef<Bookmark[]>([])

  async function fetchRecords() {
    const [weekData, allData] = await Promise.all([
      $fetch<SongRecord[]>('/api/ncm', { query: { type: 'weekData' } }),
      $fetch<SongRecord[]>('/api/ncm', { query: { type: 'allData' } }),
    ]).catch((err) => {
      console.error(`fetchRecords: ${err}`)
      return [[], []]
    })

    weekRecords.value = weekData
    allRecords.value = allData
  }

  async function fetchBookmarks() {
    const data = await $fetch<string>('https://chilf.vercel.app/bookmarks.html')
    bookmarks.value = await parseBookmark(data)
    return bookmarks.value
  }

  return {
    weekRecords,
    allRecords,
    bookmarks,

    fetchBookmarks,
    fetchRecords,
  }
})
