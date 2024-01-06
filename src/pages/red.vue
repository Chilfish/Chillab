<script setup lang="ts">
import type { Post } from '~/types'

const posts: Post[] = Array.from({ length: 6 }, (_, i) => ({
  id: `${i}`,
  title: `Red Post ${i}`,
  content: `guys, who know that... @momo_${(i + 1) % 6} is so cool`,
  owner: `momo_${i}`,
  likes: 10 * i,
  photos: ['/kurarin.webp'],
}))

const showModal = ref(false)
const showedPost = ref<Post | null>(null)
const postsEl = ref<HTMLElement[] | null>(null)

// const isLocked = useScrollLock(window)
const route = useRoute()

function showDetail(id: string) {
  const post = posts.find(e => e.id === id)
  if (!post) {
    navigateTo({ path: '/red' })
    return
  }

  showModal.value = true
  // isLocked.value = true
  showedPost.value = post
  navigateTo({ query: { id: post.id } })

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

function closeDetail() {
  showModal.value = false
  // isLocked.value = false
  if (route.query.id)
    navigateTo({ path: '/red' })
}

// handle back action on mobile
watch(() => route.query, (query) => {
  if (!query.id)
    closeDetail()
})
</script>

<template>
  <main
    class="relative flex flex-col-reverse gap-2"
    lg="flex-row"
  >
    <aside
      class="fixed bottom-0 left-0 z-10 h-12 w-full rounded p-4"
      lg="h-auto w-70 absolute top-0"
      bg="light-5 dark:dark-5"
    >
      aside
    </aside>

    <ul
      class="grid w-fit items-center gap-3 p-2 pb-15"
      grid-cols="2 sm:3 md:4"
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
          @show-detail="showDetail(post.id)"
        />
      </li>
    </ul>

    <modal
      id="redDetail"
      v-model:show="showModal"
      @update:show="closeDetail"
    >
      <red-detail
        v-if="showedPost"
        :post="showedPost"
        @update:show="closeDetail"
      />
    </modal>
  </main>
</template>
