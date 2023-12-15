<script setup lang="ts">
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
  <main class="w-full center-col md:w-60%">
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

    <Transition name="fade">
      <p
        v-show="githubStore.repoStatus !== 'success'"
        class="select-none font-bold"
        text="center 2xl gray-5"
      >
        {{ githubStore.statusText }}
      </p>
    </Transition>

    <TransitionGroup
      tag="ul"
      name="fade"
    >
      <li
        v-for="repo in githubStore.repos"
        :key="repo.id"
      >
        <github-card :item="repo" />
      </li>
    </TransitionGroup>
  </main>
</template>
