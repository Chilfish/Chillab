import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import routes from 'virtual:generated-pages'
import Toast from '@cp/Toast'

interface Meta {
  auth?: boolean
  layout?: string
  [key: string]: any
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  const { auth } = to.meta as Meta
  const cookies = useCookies()

  if (auth && !cookies.get('token')) {
    Toast({
      message: 'You need to login first',
      type: 'error',
    })

    return {
      path: '/auth',
      query: {
        redirect: to.fullPath,
      },
    }
  }
})

export default router
