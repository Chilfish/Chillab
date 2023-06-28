<script setup lang="ts">
import { computed, ref } from 'vue'
import TodoItem from './TodoItem.vue'
import type { todoItem } from '~/types'

const newTodo = ref<string>('')

const todoArr = ref<todoItem[]>([
  { id: '1', content: 'Buy a car', done: false },
  { id: '2', content: 'Buy a house', done: false },
  { id: '3', content: 'Buy a boat', done: false },
])

function addTodo() {
  if (!newTodo.value)
    return

  todoArr.value.push({
    id: Date.now().toString(),
    content: newTodo.value,
    done: false,
  })
  newTodo.value = ''
}

// might be a bit problematic
const completedNum = computed(() => {
  return todoArr.value.filter(todo => todo.done).length
})
</script>

<template>
  <main flex flex-col>
    <h1 text-center text-2xl font-bold my-xl>
      Chill Todo List
    </h1>
    <label flex my-6>
      <input
        v-model="newTodo"
        type="text"
        w-full h-14 mr-3 p-4 rounded-3
        bg-dark-50

        placeholder="Add a new todo"
        @keyup.enter="addTodo"
      >
      <button
        btn w-18 h-14 rounded-3
        @click="addTodo"
      >
        Add
      </button>
    </label>

    <ul>
      <template v-for="(todo, index) in todoArr" :key="todo.id">
        <li v-if="!todo.done">
          <TodoItem
            :item="todo"
            @toggle="todoArr[index].done = !todoArr[index].done"
            @delete="todoArr.splice(index, 1)"
          />
        </li>
      </template>
    </ul>

    <details v-if="completedNum" open>
      <summary
        mt-4 mb-2 cursor-pointer
      >
        Completed {{ completedNum }}
      </summary>

      <ul>
        <template v-for="(todo, index) in todoArr" :key="todo.id">
          <li v-if="todo.done">
            <TodoItem
              :item="todo"
              @toggle="todoArr[index].done = !todoArr[index].done"
              @delete="todoArr.splice(index, 1)"
            />
          </li>
        </template>
      </ul>
    </details>
  </main>
</template>
