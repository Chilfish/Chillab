<script setup lang="ts">
import GithubCard from '@cp/GithubCard.vue'
import { computed, onMounted, ref } from 'vue'
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs'
import { filter, map, switchMap, tap } from 'rxjs/operators'
import { GithubService } from '~/services/githubService'
import type { GithubRepo, reqState } from '~/types'

const repos = ref([] as GithubRepo[])
const searchInput = ref<HTMLInputElement | null>(null)
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

// wait for the searchInput to be mounted
onMounted(() => {
  fromEvent(searchInput.value!, 'input')
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
        return githubService.getRepos(val)
      }),
    ).subscribe({
      next: (data) => {
        repoStatus.value = data.length === 0 ? 'notFound' : 'success'
        repos.value = data
      },
      error: (error) => {
        console.error(error.message)
        repoStatus.value = 'error'
      },
    })
})
</script>

<template>
  <h2>Search Github Repositories</h2>

  <label class="w-full">
    <input
      ref="searchInput"
      placeholder="repo name"
      type="search"
      class="my-2xl w-full rounded-3 bg-dark-50 p-2 pl-4"
    >
  </label>
  <section class="my-2xl w-full">
    <template v-if="repoStatus === 'success'">
      <GithubCard v-for="repo in repos" :key="repo.id" :item="repo" />
    </template>

    <p
      v-else
      class="select-none text-center text-2xl font-bold text-gray-500"
    >
      {{ statusText }}
    </p>
  </section>
</template>
