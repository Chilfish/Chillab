import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import 'dotenv/config'

const {
  API_URL = 'http://localhost:3003',
} = process.env

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

    Pages({
      importMode: 'async',
    }),
    VueDevTools(),
  ],

  server: {
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
