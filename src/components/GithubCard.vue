<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { computed } from 'vue'
import { fmtNum } from '~/utils'
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
    class="my-3 flex gap-4 rounded-2 p-2"
    bg="light-5 dark:dark-5"
    sm:hover-bg="light-7 dark:dark-3"
  >

    <a
      :href="item.owner.html_url"
      target="_blank"
      rel="noopener noreferrer"
      class="display-ruby h-20 w-0 transition-width sm:w-20"
    >
      <img
        :src="avatarUrl"
        :alt="`${item.owner.login}'s avatar`"
        class="h-full w-full rounded-3"
      >
    </a>

    <div class="flex flex-col gap-2 break-all">
      <p
        class="font-semibold tracking-wide"
        text="start 4.2 sm:5"
      >
        {{ item.full_name }} </p>
      <p
        text="start sm"
      >{{ item.description }} </p>

      <div
        class="info flex text-sm"
      >
        <div>
          <span class="i-tabler-star icon" />
          <span>{{ fmtNum(item.stargazers_count) }}</span>
        </div>
        <div>
          <span class="i-tabler-git-fork icon" />
          <span> {{ fmtNum(item.forks_count) }}</span>
        </div>
        <div>
          <span class="i-tabler-circle-dot icon" />
          <span>{{ fmtNum(item.open_issues) }}</span>
        </div>
        <div v-if="item.language">{{ item.language }}</div>
      </div>
    </div>
  </a>
</template>

<style scoped>
.info > div {
  --uno: center mr-3 sm:mr-6;
}
</style>
