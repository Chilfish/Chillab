import { createApp } from 'vue'
import App from '~/App.vue'
import router from '~/router'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.css'

const app = createApp(App)

app
  .use(router)
  .mount('#app')
