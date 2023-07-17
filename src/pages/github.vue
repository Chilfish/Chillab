<script setup lang="ts">
import GithubCard from '@cp/GithubCard.vue'
import { onMounted, ref } from 'vue'

import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs'
import { filter, map, switchMap } from 'rxjs/operators'
import type { GithubRepo } from '~/types'

const repos = ref([] as GithubRepo[])
const searchInput = ref<HTMLInputElement | null>(null)

async function search(input: string) {
  return await fetch(`https://api.github.com/search/repositories?q=${input}`)
    .then(res => res.json())
    .then(data => data.items)
}

onMounted(() => {
  fromEvent(searchInput.value!, 'input')
    .pipe(
      map(e => (e.target as HTMLInputElement).value.trim()),
      filter(val => val.length !== 0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(val => search(val)),
    )
    .subscribe((data) => {
      repos.value = data
    })
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
  <section class="my-2xl">
    <GithubCard v-for="repo in repos" :key="repo.id" :item="repo" />
  </section>
</template>
