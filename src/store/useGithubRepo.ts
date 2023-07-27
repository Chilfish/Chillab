import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { GithubService } from '~/services/githubService'
import type { GithubRepo, reqState } from '~/types'

export const useGithubRepoStore = defineStore('githubRepo', () => {
  const inputValue = ref('')

  const repos = ref([] as GithubRepo[])
  const repoStatus = ref<reqState>('idle')

  const githubService = new GithubService()

  const statusText = computed(() => {
    switch (repoStatus.value) {
      case 'loading':
        return 'Loading...'
      case 'notFound':
        return 'Not Found'
      case 'error':
        return 'Error'
      default:
        return ''
    }
  })

  return {
    inputValue,
    repos,
    repoStatus,
    statusText,
    githubService,
  }
})
