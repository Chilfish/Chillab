<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { computed } from 'vue'
import type { GithubRepo } from '~/types'

const repo = defineProps<{
  item: GithubRepo
}>()

const { isLoading } = useImage({ src: repo.item.owner.avatar_url })
const avatarUrl = computed(() =>
  isLoading.value
    ? 'https://place-hold.it/100x100'
    : repo.item.owner.avatar_url,
)
</script>

<template>
  <a
    :href="item.html_url"
    target="_blank"
    rel="noopener noreferrer"
    class="my-sm flex items-center rounded-2 bg-light-5 p-2 dark:bg-dark-5 hover:bg-light-7 hover:dark:bg-dark-3"
  >
    <img
      :src="avatarUrl"
      alt="avatar"
      class="mr-4 h-full w-20 rounded-xl"
    >
    <div class="flex flex-col">
      <p
        class="mb-2 overflow-x-auto text-start text-lg font-semibold tracking-wide"
      >
        {{ item.full_name }} </p>
      <p
        class="overflow-x-auto text-start text-sm"
      >{{ item.description }} </p>

      <div
        class="info mt-2 flex text-sm"
      >
        <div>
          <span class="icon i-carbon-star" />
          <span>{{ item.stargazers_count }}</span>
        </div>
        <div>
          <span class="icon i-carbon-fork" />
          <span> {{ item.forks_count }}</span>
        </div>
        <div>
          <span class="icon issues" />
          <span>{{ item.open_issues }}</span>
        </div>
        <div v-if="item.language">{{ item.language }}</div>
      </div>
    </div>
  </a>
</template>

<style scoped>
.info > div {
  @apply flex items-center mr-2xl
}

.icon {
  @apply h-4 w-4 cursor-pointer inline-block mr-1
}

.issues{
  --un-icon: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="16" height="16" viewBox="0 0 16 16"%3E%3Cg fill="currentColor"%3E%3Cpath d="M7.5 1a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13Zm0 12a5.5 5.5 0 1 1 0-11a5.5 5.5 0 0 1 0 11Z"%2F%3E%3Ccircle cx="7.5" cy="7.5" r="1"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E');

  mask: var(--un-icon) no-repeat;
  mask-size: 100% 100%;
  background-color: currentcolor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
}
</style>
