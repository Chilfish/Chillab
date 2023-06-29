import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@pg/index.vue'),
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('@cp/TodoList/TodoList.vue'),
    beforeEnter: (to, from) => {
      document.title = 'Chill Todo List'
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
