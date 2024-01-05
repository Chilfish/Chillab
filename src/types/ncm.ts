export interface Song {
  id: number
  name: string

  /**
   * 歌手
   */
  ar: {
    id: number
    name: string
  }[]

  /**
   * 专辑
   */
  al: {
    id: number
    name: string
    picUrl: string
  }

  /**
   * 时长，单位：毫秒
   */
  dt: number
}

export interface SongRecord {
  playCount: number
  score: number
  song: Song
}
