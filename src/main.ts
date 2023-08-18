import { createApp } from 'vue'
import { createPinia } from 'pinia'
import installer from './utils/installer'
import App from '~/App.vue'
import router from '~/router'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.scss'

const app = createApp(App)

app
  .use(router)
  .use(createPinia())
  .use(installer)
  .mount('#app')
