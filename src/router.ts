import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import routes from 'virtual:generated-pages'

interface Meta {
  auth?: boolean
  layout?: string
  [key: string]: any
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const { auth } = to.meta as Meta
  const cookies = useCookies()

  if (auth && !cookies.get('token'))
    return next({ path: '/auth' })

  next()
})

export default router
