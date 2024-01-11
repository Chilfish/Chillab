import { FastAverageColor } from 'fast-average-color'
import { consola } from 'consola'
import type { Immutable, Mutable } from '~/types'

export const isClient = process.client
export const isDev = process.env.NODE_ENV === 'development'

export function fmtNum(x: number | string) {
  const num = Number(x)

  if (num < 1)
    return '0'
  if (num < 1000)
    return num
  if (num < 10000)
    return `${Math.floor(num / 100) / 10}k`
  if (num < 100000)
    return `${Math.floor(num / 1000)}k`
  return '100k+'
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function toMutable<T>(obj: T) {
  return obj as Mutable<T>
}

export function toImmutable<T>(obj: T) {
  return obj as Immutable<T>
}

const fac = new FastAverageColor()
export async function imgTheme(src: string) {
  try {
    const { hex, isLight, value } = await fac.getColorAsync(src, {
      algorithm: 'dominant',
      ignoredColor: [
        [255, 255, 255, 255, 5], // white
        [0, 0, 0, 255, 5], // black
      ],
    })

    return {
      hex,
      rgb: value.slice(0, 3),
      text: isLight ? '#000' : '#fff',
    }
  }
  catch (e) {
    consola.log('imgTheme error', e)
    return {
      hex: '#fff',
      rgb: [255, 255, 255],
      text: '#000',
    }
  }
}
