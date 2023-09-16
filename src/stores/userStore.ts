import { defineStore } from 'pinia'
import type { UserAuth } from '~/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserAuth>({
    id: 0,
    username: '',
    password: '',
    token: '',
    level: 'user',
  })

  return {
    user,
  }
}, {
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }),
  },
})
