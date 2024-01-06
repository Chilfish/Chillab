import { consola } from 'consola'
import type { NCMType, Song } from '~/types'

const {
  NCM_API = '',
  NCM_COOKIE = '',
  NCM_UID = 1,
} = process.env

interface Data {
  playCount: number
  score: number
  song: Song
}

interface NCMResponse {
  weekData: Data[]
  allData: Data[]
  code: number
}

function parser(data: NCMResponse, type: NCMType) {
  return data[type].map(({ song, playCount, score }) => ({
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
  })).slice(0, 20)
}

export default defineEventHandler(async (event) => {
  const { type } = getQuery(event) as { type: NCMType }
  const url = `${NCM_API}/user/record?uid=${NCM_UID}&type=${type === 'weekData' ? 1 : 0}`

  const data = await $fetch<NCMResponse>(url, {
    headers: {
      Cookie: NCM_COOKIE,
    },
  })
    .catch(err => consola.error(err))

  if (!data)
    return []

  return parser(data, type)
})
