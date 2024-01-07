import { defineStore } from 'pinia'
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs'
import { filter, map, switchMap, tap } from 'rxjs/operators'
import { GithubService } from '~/services/githubService'
import type { GithubRepo, reqState } from '~/types'

export const useGithubRepoStore = defineStore('githubRepo', () => {
  const inputValue = ref('')

  const repos = shallowRef([] as GithubRepo[])
  const repoStatus = ref<reqState>('idle')
  const errorText = ref('')

  const githubService = new GithubService()

  const statusText = computed(() => {
    switch (repoStatus.value) {
      case 'loading':
        return 'Loading...'
      case 'notFound':
        return 'Not Found'
      case 'error':
        return `Error! ${errorText.value}`
      default:
        return ''
    }
  })

  async function fetchRepos(inputRef: HTMLInputElement) {
    return fromEvent(inputRef, 'input')
      .pipe(
        map(e => (e.target as HTMLInputElement).value.trim()),
        tap((val) => {
          if (val.length === 0)
            repoStatus.value = 'idle'
        }),
        filter(val => val.length !== 0),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((val: string) => {
          repoStatus.value = 'loading'
          repos.value = []
          inputValue.value = val
          return githubService.getRepos(val)
        }),
      )
      .subscribe({
        next: (data) => {
          repoStatus.value = data.length === 0 ? 'notFound' : 'success'
          repos.value = data.sort((a, b) => b.stargazers_count - a.stargazers_count)
        },
        error: (error) => {
          console.error(error)
          repoStatus.value = 'error'
          errorText.value = error.message
        },
      })
  }

  return {
    inputValue,
    repos,
    repoStatus,
    statusText,
    githubService,

    fetchRepos,
  }
})
