import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { pwa } from './src/config/pwa'
import { appDescription } from './src/constants/index'

const {
  API_URL = 'http://localhost:3003',
} = process.env

export default defineNuxtConfig({
  srcDir: 'src/',
  serverDir: './server',
  dir: {
    public: '../public',
  },

  modules: [
    '@unocss/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@vue-macros/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
  ],

  imports: {
    dirs: [
      'stores',
      'server/utils',
    ],
  },

  alias: {
    '@cpa': fileURLToPath(new URL('./src/components_app', import.meta.url)),
    '@cp': fileURLToPath(new URL('./src/components', import.meta.url)),
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  devtools: {
    enabled: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/style.scss',
  ],

  colorMode: {
    classSuffix: '',
  },

  typescript: {
    strict: true,
  },

  runtimeConfig: {

  },

  routeRules: {
    '/': { redirect: '/test' },
    '/admin': { redirect: '/admin/dashboard' },
    '/todo': { ssr: false }, // persist pinia in localStorage
    '/api/p/**': { proxy: `${API_URL}/**` },
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      // routes: ['/'],
      // ignore: ['/hi'],
    },
  },

  build: {
    transpile: ['rxjs'],
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,
})
