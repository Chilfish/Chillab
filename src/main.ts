import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import installer from './utils/installer'
import router from './router'
import App from '~/App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './assets/style.scss'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app
  .use(installer)
  .use(router)
  .use(pinia)
  .mount('#app')
