import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@pg/index.vue'),
  },
  {
    path: '/todo',
    component: () => import('@pg/todo.vue'),
  },
  {
    path: '/github',
    component: () => import('@pg/github.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
