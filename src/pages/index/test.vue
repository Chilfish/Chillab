<script setup lang="ts">
import { UseDraggable } from '@vueuse/components'
import { h } from 'vue'

import Toast from '@cpa/Toast'
import SortArr from '@cp/SortArr.vue'
import Swiper from '@cp/common/Swiper.vue'
import Bookmarks from '@cp/bookmark/Select.vue'

const { percentY, percentX } = useScrollRatio()

const cp = {
  SortArr,
  Swiper: h(Swiper, {
    imgs: [
      '/ender-girls.jpg',
      '/kurarin.webp',
      '/ender-bocchi.webp',
    ],
    onClick(src: string) {
      if (typeof src !== 'string')
        return
      imgPreviewUrl.value = src
    },
  }),
  Bookmarks,
}

type Cp = keyof typeof cp

const router = useRouter()
const hash = computed(() => {
  let _hash = useRoute().hash.slice(1) as Cp

  if (!_hash)
    _hash = 'SortArr'

  useHead({
    title: `${_hash} | Chill Vue`,
  })

  return _hash
})

const curCp = computed<Cp>({
  get() { return hash.value },
  set(v) { router.replace({ hash: `#${v}` }) },
})
</script>

<template>
  <main class="w-full flex flex-col items-center gap-4 p-4 pt-0">
    <div class="btns center gap-4">
      <button
        class="w-16"
        @click="Toast({ type: 'success', message: `Success Toast` })"
      >
        toast
      </button>

      <select v-model="curCp" class="btn">
        <option
          v-for="key in Object.keys(cp)"
          :key="key"
          :value="key"
        >
          {{ key }}
        </option>
      </select>
    </div>

    <KeepAlive>
      <Transition name="fade">
        <component :is="cp[curCp]" :key="curCp" />
      </Transition>
    </KeepAlive>

    <ClientOnly>
      <UseDraggable
        v-slot="{ x, y }"
        class="fixed z-999 hidden center cursor-move select-none rounded-2 p-4 sm:block blur-bg"
        :initial-value="{ x: 50, y: 50 }"
      >
        <div>
          Scroll Ratio: X: {{ percentX }}, Y: {{ percentY }}<br>
          Pos: x: {{ x.toFixed(0) }}, y: {{ y.toFixed(0) }}
        </div>
      </UseDraggable>
    </ClientOnly>
  </main>
</template>
