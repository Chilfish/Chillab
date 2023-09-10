import path from 'node:path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@cp/': `${path.resolve(__dirname, 'src/components')}/`,
      '@pg/': `${path.resolve(__dirname, 'src/pages')}/`,
    },
  },
  plugins: [
    // VueDevTools(),
    vue(),
    UnoCSS(),
    Components({
      dts: 'src/types/components.d.ts',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        'vue-router',
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [
        'src/components',
        'src/composables',
        'src/utils',
        'src/stores',
      ],
      vueTemplate: true,
    }),

    // https://vue-macros.sxzz.moe/features/reactivity-transform.html
    ReactivityTransform(),
  ],
})
