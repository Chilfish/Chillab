import { defineStore } from 'pinia'

// import type {  } from '~/types'

export const useAdminStore = defineStore('admin', () => {
  const isCollapse = ref(false)

  return {
    isCollapse,
  }
})
