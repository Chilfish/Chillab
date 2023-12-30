<script setup lang="ts">
import { shuffle as _shuffle } from 'lodash-es'
import { useSortable } from '@vueuse/integrations/useSortable'

defineOptions({
  name: 'SortArr',
})

const getInitialItems = () => [1, 2, 3, 4, 5]
const items = ref(getInitialItems())
const id = ref(items.value.length + 1)

function insert() {
  const i = Math.round(Math.random() * items.value.length)
  items.value.splice(i, 0, id.value++)
}

function reset() {
  items.value = getInitialItems()
  id.value = items.value.length + 1
}

function shuffle() {
  items.value = _shuffle(items.value)
}

function remove(item: number) {
  const i = items.value.indexOf(item)
  if (i > -1)
    items.value.splice(i, 1)
}

useSortable('#arr-list', items, {
  animation: 150,
})
</script>

<template>
  <div
    class="w-90 center flex-col select-none gap-4 rounded p-4 transition-all duration-300 ease-in-out"
    bg="light-2 dark:dark-4"
  >
    <div class="btns center gap-4">
      <button @click="insert">
        insert
      </button>
      <button @click="reset">
        reset
      </button>
      <button @click="shuffle">
        shuffle
      </button>
    </div>

    <TransitionGroup
      id="arr-list"
      tag="ul"
      name="fade"
      class="relative w-full flex flex-col gap-2"
    >
      <li
        v-for="item in items"
        :key="item"
        class="w-full center cursor-move justify-between rounded p-3"
        bg="light-4 dark:dark-5"
      >
        {{ item }}
        <button @click="remove(item)">
          x
        </button>
      </li>
    </TransitionGroup>
  </div>
</template>
