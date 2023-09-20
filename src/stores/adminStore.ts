import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {
  const route = useRoute()
  const isCollapse = ref(false)

  const curTitle = computed(() => (route.params.all as string[])?.join('/'))

  return {
    isCollapse,
    curTitle,
  }
})
