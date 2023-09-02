import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/test',
    component: () => import('@pg/index.vue'),
    children: [
      {
        path: 'test',
        component: () => import('@pg/test.vue'),
      },
      {
        path: 'todo',
        component: () => import('@pg/todo.vue'),
      },
      {
        path: 'github',
        component: () => import('@pg/github.vue'),
      },
      {
        path: 'red',
        component: () => import('@pg/red.vue'),
      },
      {
        path: 'titan',
        component: () => import('@pg/titan.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
