import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {
  const isCollapse = ref(false)
  const curTitle = ref('')

  return {
    isCollapse,
    curTitle,
  }
})
