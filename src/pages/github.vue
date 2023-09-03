<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGithubRepoStore } from '~/store/useGithubRepo'

const searchInput = ref<HTMLInputElement | null>(null)
const githubStore = useGithubRepoStore()

// wait for the searchInput to be mounted
onMounted(async () => {
  if (searchInput.value)
    searchInput.value.value = githubStore.inputValue

  await githubStore.fetchRepos(searchInput.value!)
})
</script>

<template>
  <main class="w-80% flex flex-col sm:w-50%">
    <h2>Search Github Repositories</h2>

    <label class="my-4 w-full">
      <input
        ref="searchInput"
        placeholder="repo name"
        type="search"
        class="w-full rounded-2 p-3"
        bg="light-7 dark:dark-3"
      >
    </label>

    <section class="w-full">
      <template v-if="githubStore.repoStatus === 'success'">
        <GithubCard
          v-for="repo in githubStore.repos"
          :key="repo.id"
          :item="repo"
        />
      </template>

      <p
        v-else
        class="select-none font-bold"
        text="center 2xl gray-5"
      >
        {{ githubStore.statusText }}
      </p>
    </section>
  </main>
</template>
