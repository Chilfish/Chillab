<script setup lang="ts">
import type { GithubRepo } from '~/types'

defineProps<{
  item: GithubRepo
}>()
</script>

<template>
  <NuxtLink
    :href="item.html_url"
    :no-rel="true"
    target="_blank"
    class="my-3 flex gap-4 rounded-2 p-2"
    bg="light-5 dark:dark-5"
    sm:hover-bg="light-7 dark:dark-3"
  >
    <NuxtLink
      :href="item.owner.html_url"
      :no-rel="true"
      target="_blank"
      sm="w-20 h-20"
      class="block h-0 w-0 flex-shrink-0 transition-width"
    >
      <NuxtImg
        loading="lazy"
        placeholder="/placeholder.png"
        class="h-full w-full rounded-3"
        :src="item.owner.avatar_url"
        :alt="`${item.owner.login}'s avatar`"
      />
    </NuxtLink>

    <div class="flex flex-col gap-2 break-all">
      <p
        class="font-semibold tracking-wide"
        text="start 4.2 sm:5"
      >
        {{ item.full_name }}
      </p>
      <p
        text="start sm"
      >
        {{ item.description }}
      </p>

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
        <div v-if="item.language">
          {{ item.language }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.info > div {
  --uno: center mr-3 sm: mr-6;
}
</style>
