import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import routes from 'virtual:generated-pages'
import installer from './utils/installer'
import App from '~/App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './assets/style.scss'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app
  .use(installer)
  .use(router)
  .use(pinia)
  .mount('#app')
