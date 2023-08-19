<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs'
import { filter, map, switchMap, tap } from 'rxjs/operators'

import GithubCard from '@cp/GithubCard.vue'
import { useGithubRepoStore } from '~/store/useGithubRepo'

const searchInput = ref<HTMLInputElement | null>(null)
const useGithub = useGithubRepoStore()

// wait for the searchInput to be mounted
onMounted(() => {
  if (searchInput.value)
    searchInput.value.value = useGithub.inputValue

  fromEvent(searchInput.value!, 'input')
    .pipe(
      map(e => (e.target as HTMLInputElement).value.trim()),
      tap((val) => {
        if (val.length === 0)
          useGithub.repoStatus = 'idle'
      }),
      filter(val => val.length !== 0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((val: string) => {
        useGithub.repoStatus = 'loading'
        useGithub.inputValue = val
        return useGithub.githubService.getRepos(val)
      }),
    ).subscribe({
      next: (data) => {
        useGithub.repoStatus = data.length === 0 ? 'notFound' : 'success'
        useGithub.repos = data
      },
      error: (error) => {
        console.error(error.message)
        useGithub.repoStatus = 'error'
      },
    })
})
</script>

<template>
  <main class="w-80% flex flex-col sm:w-xl">
    <h2>Search Github Repositories</h2>

    <label class="w-full">
      <input
        ref="searchInput"
        placeholder="repo name"
        type="search"
        class="my-2xl w-full rounded-3 bg-[--gray] p-2 pl-4"
      >
    </label>
    <section class="my-2xl w-full">
      <template v-if="useGithub.repoStatus === 'success'">
        <GithubCard v-for="repo in useGithub.repos" :key="repo.id" :item="repo" />
      </template>

      <p
        v-else
        class="select-none text-center text-2xl font-bold text-gray-500"
      >
        {{ useGithub.statusText }}
      </p>
    </section>
  </main>
</template>
