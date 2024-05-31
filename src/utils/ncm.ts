import type { NCMType, Song, SongRecord } from '~/types'

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

function parser(data: NCMResponse, type: NCMType): SongRecord[] {
  return data[type].map(({ song, playCount, score }) => ({
    id: song.id,
    name: song.name,
    ar: song.ar.map(({ id, name }) => ({ id, name })),
    al: {
      id: song.al.id,
      name: song.al.name,
      picUrl: `${song.al.picUrl.replace('http://', 'https://')}?param=128y128`,
    },
    dt: song.dt,
    playCount,
    score,
  }))
    .slice(0, 20)
}

export async function fetchMusic(type: NCMType) {
  const url = `https://ncmm.chilfish.top/user/record?uid=1533509979&type=${type === 'weekData' ? 1 : 0}`

  const { data } = await $fetch<{ data: NCMResponse }>(url, {
    headers: {
      'Cache-Control': 's-max-age=86400, stale-while-revalidate=30', // 缓存一天
      'CDN-Cache-Control': 'max-age=86400',
      'Vercel-CDN-Cache-Control': 'max-age=86400',
    },
  })

  if (!data)
    return []

  return parser(data, type)
}
