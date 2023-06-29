import path from 'node:path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'

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
  ],
})
