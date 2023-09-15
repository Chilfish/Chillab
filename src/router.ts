import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

/**
 * auto register routes from files
 */
function files2Routes(exclude = ['auth']) {
  const files = import.meta.glob('./pages/*.vue')

  return Object.keys(files).map((path) => {
    if (exclude.some(item => path.includes(item)))
      return null

    const name = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
    return {
      path: `/${name}`,
      name,
      component: files[path],
    }
  })
    .filter(Boolean) as RouteRecordRaw[]
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/test',
    component: () => import('@pg/index.vue'),
    children: files2Routes(),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
