<script setup lang="ts">
import { UseDraggable } from '@vueuse/components'
import { h } from 'vue'
import { Bookmark, ImgContrast, ImgTheme, Swiper } from '#components'
import { appName } from '~/constants'

const { percentY, percentX } = useScrollRatio()

const cp = {
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
  Bookmark,
  ImgContrast: h(ImgContrast, {
    before: '/ender-girls.jpg',
    after: '/ender-bocchi.webp',
  }),
  ImgTheme: h(ImgTheme, {
    src: '/ender-girls.jpg',
  }),
} as const

type Cp = keyof typeof cp

const tabLinks = Object.keys(cp).map(name => ({
  name,
  path: `#${name}`,
}))

const hash = computed(() => {
  let _hash = useRoute().hash.slice(1) as Cp

  if (!_hash)
    _hash = 'Swiper'

  useHead({
    title: `${_hash} | ${appName}`,
  })

  return _hash
})

const curCp = computed<Cp>({
  get() { return hash.value },
  set(v) { navigateTo({ hash: `#${v}` }) },
})
</script>

<template>
  <main class="w-full flex flex-col items-center gap-4 p-4 pt-0">
    <Tabs :links="tabLinks" type="hash" />

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
