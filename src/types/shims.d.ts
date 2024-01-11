import type { AttributifyAttributes } from '@unocss/preset-attributify'

type Prefix = 'uno:' // change it to your prefix

interface HTMLAttributes
  extends Partial<Record<AttributifyNames<Prefix>, string>> {}

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}
