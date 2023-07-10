<script setup lang="ts">
import { computed, ref } from 'vue'
import { createReusableTemplate } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'
import type { todoItem } from '~/types'

const newTodo = ref('')
const todoArr = ref([
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

function deleteTodoItem(todo: todoItem) {
  todoArr.value.splice(todoArr.value.indexOf(todo), 1)
}

const completedTodos = computed(() => {
  return todoArr.value.filter(todo => todo.done)
})

const uncompletedTodos = computed(() => {
  return todoArr.value.filter(todo => !todo.done)
})

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
    <ul
      :id="list === completedTodos ? 'completed' : 'uncompleted'"
      w-full sm:w-xl
    >
      <li v-for="todo in list" :key="todo.id">
        <TodoItem
          :item="todo"
          @toggle="todo.done = !todo.done"
          @delete="deleteTodoItem(todo)"
        />
      </li>
    </ul>
  </DTodoList>

  <main flex flex-col items-center justify-center p-sm>
    <h1 my-xl text-center text-2xl font-bold>
      Chill Todo List
    </h1>
    <label my-6 w-full flex sm:w-xl>
      <input
        v-model="newTodo"
        type="text"
        mr-3 h-14 w-full rounded-3 bg-dark-50 p-4
        placeholder="Add a new todo"
        @keyup.enter="addTodo"
      >
      <button
        h-14 w-18 rounded-3 btn
        @click="addTodo"
      >
        Add
      </button>
    </label>

    <TodoList :list="uncompletedTodos" />

    <details
      v-show="completedTodos.length"
      open
      w-full sm:w-xl
    >
      <summary
        mb-2 mt-4 cursor-pointer
      >
        Completed {{ completedTodos.length }}
      </summary>

      <TodoList :list="completedTodos" />
    </details>
  </main>
</template>
