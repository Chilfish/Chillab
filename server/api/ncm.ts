import type { SongRecord } from '~/types'

const {
  NCM_API = '',
  NCM_COOKIE = '',
  NCM_UID = 1,
} = process.env

interface NCMResponse {
  weekData: SongRecord[]
  code: number
}

export default defineEventHandler(async (_event) => {
  const data = await $fetch(`${NCM_API}/user/record?uid=${NCM_UID}&type=1`, {
    method: 'POST',
    body: {
      cookie: NCM_COOKIE,
    },
  }).catch(err => console.error(err))

  return (data as NCMResponse)?.weekData?.map(({ song, playCount, score }) => ({
    id: song.id,
    name: song.name,
    ar: song.ar.map(({ id, name }) => ({ id, name })),
    al: {
      id: song.al.id,
      name: song.al.name,
      picUrl: song.al.picUrl,
    },
    dt: song.dt,
    playCount,
    score,
  }))
})
