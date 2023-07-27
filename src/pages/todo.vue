<script setup lang="ts">
import { ref } from 'vue'
import { createReusableTemplate, useArrayFilter } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'
import type { todoItem } from '~/types'

const newTodo = ref('')
const todoArr = ref<todoItem[]>([
  { id: '1', content: 'Buy a car', done: false },
  { id: '2', content: 'Buy a house', done: false },
  { id: '3', content: 'Buy a boat', done: false },
])

function addTodo() {
  const content = newTodo.value.trim()
  if (!content || content === '')
    return

  const newTodoItem = {
    id: Date.now().toString(),
    content,
    done: false,
  }

  todoArr.value.push(newTodoItem)
  newTodo.value = ''
}

const completedTodos = useArrayFilter(todoArr, todo => todo.done)
const uncompletedTodos = useArrayFilter(todoArr, todo => !todo.done)

const {
  define: DTodoList,
  reuse: TodoList,
} = createReusableTemplate<{ list: todoItem[] }>()

useSortable('#completed', completedTodos, {
  animation: 150,
})

useSortable('#uncompleted', uncompletedTodos, {
  animation: 150,
})
</script>

<template>
  <DTodoList v-slot="{ list }">
    <ul :id="list === completedTodos ? 'completed' : 'uncompleted'">
      <li v-for="todo in list" :key="todo.id">
        <TodoItem
          :item="todo"
          @toggle="todo.done = !todo.done"
          @delete="todoArr.splice(todoArr.indexOf(todo), 1)"
        />
      </li>
    </ul>
  </DTodoList>

  <main class="flex flex-col w-full">
    <h2> Chill Todo List </h2>
    <label class="my-6 w-full flex">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Add a new todo"
        class="mr-3 h-14 w-full rounded-3 bg-dark-50 p-4"
        @keyup.enter="addTodo"
      >
      <button
        class="h-14 w-18 rounded-3 btn"
        @click="addTodo"
      >
        Add
      </button>
    </label>

    <TodoList :list="uncompletedTodos" />

    <details
      v-show="completedTodos.length"
      open
    >
      <summary class="mb-2 mt-4 cursor-pointer">
        Completed {{ completedTodos.length }}
      </summary>

      <TodoList :list="completedTodos" />
    </details>
  </main>
</template>
