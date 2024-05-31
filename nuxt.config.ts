import { fileURLToPath } from 'node:url'
import { appDescription } from './src/constants/index'

export default defineNuxtConfig({
  srcDir: 'src/',
  serverDir: './server',
  dir: {
    public: '../public',
  },

  modules: [
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@vue-macros/nuxt',
  ],

  imports: {
    dirs: [
      'stores',
    ],
  },

  components: [
    {
      path: '~/components',
      ignore: ['Plugins/**/*'],
      pathPrefix: false,
    },
  ],

  alias: {
    '@cp': fileURLToPath(new URL('./src/components', import.meta.url)),
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    // inlineSSRStyles: false,
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

  typescript: {
    strict: true,
  },
  routeRules: {
    // '/': { redirect: '/test' },
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
    },
  },

  // 排除 jsdom 的依赖
  vite: {
    build: {
      rollupOptions: {
        external: ['jsdom'],
      },
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
  },

  webpack: {
    analyze: false,
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

  site: {
    url: 'https://lab.chilfish.top',
    defaultLocale: 'zh-cn',
  },

  // fix: unocss + nuxt3.9 error
  // @see at https://github.com/unocss/unocss/issues/3468#issuecomment-1871049463
  features: {
    inlineStyles: false,
  },
})
