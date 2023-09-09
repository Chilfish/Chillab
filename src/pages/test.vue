<script setup lang="ts">
import { UseDraggable } from '@vueuse/components'
import { h, ref } from 'vue'

import Toast from '@cp/Toast'
import SortArr from '@cp/SortArr.vue'
import Swiper from '@cp/Swiper.vue'
import { useScrollRatio } from '~/composables/useScrollRatio'

const { percentY, percentX } = useScrollRatio()

const imgs = [
  '/ender-girls.jpg',
  '/kurarin.webp',
  '/ender-bocchi.webp',
]

const cp = {
  SortArr,
  Swiper: h(Swiper, { imgs }),
}

const curCp = ref<keyof typeof cp>('SortArr')
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

      <select
        v-model="curCp"
        class="btn"
      >
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
      <component :is="cp[curCp]" />
    </KeepAlive>

    <UseDraggable
      v-slot="{ x, y }"
      class="fixed z-999 center cursor-move select-none rounded-2 p-4 blur-bg"
      :initial-value="{ x: 50, y: 50 }"
    >
      <div>
        Scroll Ratio: X: {{ percentX }}, Y: {{ percentY }}<br>
        Pos: x: {{ x }}, y: {{ y }}
      </div>
    </UseDraggable>
  </main>
</template>
