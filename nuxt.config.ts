import { fileURLToPath } from 'node:url'

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
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
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

  devtools: {
    enabled: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/style.scss',
  ],

  typescript: {
    strict: true,
  },

  runtimeConfig: {

  },

  routeRules: {
    '/': { redirect: '/test' },
    '/todo': { ssr: false }, // persist pinia in localStorage
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.png', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
})
