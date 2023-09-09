<script setup lang="ts">
import { UseDraggable } from '@vueuse/components'
import { ref } from 'vue'

import Toast from '@cp/Toast'
import SortArr from '@cp/SortArr.vue'
import Bar from '@cp/Bar.vue'
import { useScrollRatio } from '~/composables/useScrollRatio'

const { percentY, percentX } = useScrollRatio()

const cp = {
  SortArr,
  Bar,
}

const curCp = ref<keyof typeof cp>('SortArr')
</script>

<template>
  <main class="flex flex-col gap-4 pb-2">
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
