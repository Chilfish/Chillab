import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@pg/index.vue'),
    children: [
      {
        path: '/test/:name',
        component: () => import('@pg/test.vue'),
      },
      {
        path: '/todo',
        component: () => import('@pg/todo.vue'),
      },
      {
        path: '/github',
        component: () => import('@pg/github.vue'),
      },
    ],
  },
  {
    path: '/post',
    component: () => import('@pg/post.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
