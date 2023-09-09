import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  shortcuts: [
    {
      btn: 'p-2 rounded inline-block bg-gray-6 hover:bg-gray-5 text-white cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    },
    {
      center: 'flex justify-center items-center',
    },
    {
      icon: 'h-4 w-4 cursor-pointer inline-block mr-1',
    },
    {
      'blur-bg': 'backdrop-blur-10 bg-[#00000010] dark:bg-[#ffffff10]',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
