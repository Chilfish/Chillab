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
  persist: true,
})
