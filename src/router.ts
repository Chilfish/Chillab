import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@pg/index/index.vue'),
    children: [
      {
        path: 'test',
        component: () => import('@pg/index/test.vue'),
      },
      {
        path: 'todo',
        component: () => import('@pg/index/todo.vue'),
      },
      {
        path: 'github',
        component: () => import('@pg/index/github.vue'),
      },
    ],
  },
  {
    path: '/titan',
    component: () => import('@pg/Titan.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
