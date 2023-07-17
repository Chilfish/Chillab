<script setup lang="ts">
import GithubCard from '@cp/GithubCard.vue'
import { onMounted, ref } from 'vue'
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'
import { HttpClient } from '@ngify/http'
import type { GithubRepo, reqState } from '~/types'

const repos = ref([] as GithubRepo[])
const searchInput = ref<HTMLInputElement | null>(null)
const repoStatus = ref<reqState>('idle')

const http = new HttpClient()

function search(input: string) {
  repoStatus.value = 'loading'
  http.get<{ items: GithubRepo[] }>(`https://api.github.com/search/repositories?q=${input}`)
    .pipe(
      map(res => res.items),
    ).subscribe((data) => {
      repos.value = data
      repoStatus.value = data.length === 0 ? 'notFound' : 'success'
    })
}

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
    ).subscribe(input => search(input))
})
</script>

<template>
  <h1>Search Github Repositories</h1>

  <label class="w-full">
    <input
      ref="searchInput"
      placeholder="Search Github Repositories"
      type="search"
      class="my-2xl w-full rounded-3 bg-dark-50 p-2"
    >
  </label>
  <section class="my-2xl w-full">
    <template v-if="repoStatus === 'success'">
      <GithubCard v-for="repo in repos" :key="repo.id" :item="repo" />
    </template>

    <p
      v-else-if="repoStatus === 'notFound'"
      class="text-center text-2xl text-gray-500"
    >
      Not Found
    </p>

    <p
      v-else-if="repoStatus === 'loading'"
      class="text-center text-2xl text-gray-500"
    >
      Loading...
    </p>
  </section>
</template>
