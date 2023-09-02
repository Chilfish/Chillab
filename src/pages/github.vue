<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGithubRepoStore } from '~/store/useGithubRepo'

const searchInput = ref<HTMLInputElement | null>(null)
const useGithub = useGithubRepoStore()

// wait for the searchInput to be mounted
onMounted(async () => {
  if (searchInput.value)
    searchInput.value.value = useGithub.inputValue

  await useGithub.fetchRepos(searchInput.value!)
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
        class="w-full rounded-2 bg-[--gray] p-2 pl-4"
      >
    </label>

    <section class="w-full">
      <template v-if="useGithub.repoStatus === 'success'">
        <GithubCard
          v-for="repo in useGithub.repos"
          :key="repo.id"
          :item="repo"
        />
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
