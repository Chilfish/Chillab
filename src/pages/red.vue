<script setup lang="ts">
import { ref } from 'vue'
import { useScrollLock } from '@vueuse/core'
import type { Post } from '~/types'

const posts: Post[] = Array.from({ length: 6 }, (_, i) => [
  {
    id: `${i}`,
    title: `Red Post ${i}`,
    content: 'guys, who knows that...',
    owner: `momo_${i}`,
    likes: 10 * i,
    photos: ['/kurarin.webp'],
  },
]).flat()

const showModal = ref(false)
const showedPost = ref<Post | null>(null)

const postsEl = ref<HTMLElement[] | null>(null)

const isLocked = useScrollLock(window)

function showDetail(post: Post) {
  showModal.value = true
  isLocked.value = true
  showedPost.value = post

  const clickedPost = postsEl.value!.find(
    el => el.dataset.id === post.id,
  )!

  clickedPost.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  })

  // const postMeta = {
  //   x: clickedPost.offsetLeft,
  //   y: clickedPost.offsetTop,
  //   width: clickedPost.offsetWidth,
  //   height: clickedPost.offsetHeight,
  // }
}
</script>

<template>
  <main
    class="relative flex flex-col-reverse gap-2"
    lg="flex-row"
  >
    <aside
      class="fixed bottom-0 left-0 z-10 h-12 w-full rounded bg-light-5 p-4"
      lg="h-auto w-70 absolute top-0"
      dark="bg-dark-5"
    >
      aside
    </aside>

    <ul
      class="grid grid-cols-2 w-fit items-center gap-3 p-2 pb-15"
      sm="grid-cols-3"
      md="grid-cols-4"
      lg="pl-74"
    >
      <li
        v-for="post in posts"
        ref="postsEl"
        :key="post.id"
        :data-id="post.id"
      >
        <red-item
          :post="post"
          @show-detail="showDetail(post)"
        />
      </li>
    </ul>

    <Modal
      v-model:show="showModal"
      @update:show="isLocked = false"
    >
      <RedDetail
        v-if="showedPost"
        :post="showedPost"
        @update:show="(showModal = false, isLocked = false)"
      />
    </Modal>
  </main>
</template>
