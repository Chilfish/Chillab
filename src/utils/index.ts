/* eslint-disable n/prefer-global/process */

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

export const isClient = process.client
export const isDev = process.env.NODE_ENV === 'development'
