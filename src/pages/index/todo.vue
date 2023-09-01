<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'

import type { todoItem } from '~/types'
import { useTodoStore } from '~/store/useTodo'

const useTodo = useTodoStore()

const {
  define: DTodoList,
  reuse: TodoList,
} = createReusableTemplate<{ list: todoItem[] }>()

useSortable('#completed', useTodo.completedTodos, {
  animation: 150,
})

useSortable('#uncompleted', useTodo.uncompletedTodos, {
  animation: 150,
})
</script>

<template>
  <DTodoList v-slot="{ list }">
    <ul :id="list === useTodo.completedTodos ? 'completed' : 'uncompleted'">
      <li v-for="todo in list" :key="todo.id">
        <TodoItem
          :item="todo"
          @toggle="useTodo.toggleTodoItem(todo.id)"
          @delete="useTodo.deleteTodoItem(todo.id)"
        />
      </li>
    </ul>
  </DTodoList>

  <main class="w-90% flex flex-col sm:w-50%">
    <h2> Chill Todo List </h2>
    <label class="my-6 w-full flex">
      <input
        v-model="useTodo.newTodo"
        type="text"
        placeholder="Add a new todo"
        class="mr-3 h-14 w-full rounded-3 bg-[--gray] p-4"
        @keyup.enter="useTodo.addTodo"
      >
      <button
        class="h-14 w-18 rounded-3 btn"
        @click="useTodo.addTodo"
      >
        Add
      </button>
    </label>

    <TodoList :list="useTodo.uncompletedTodos" />

    <details
      v-show="useTodo.completedTodos.length"
      open
    >
      <summary class="mb-2 mt-4 cursor-pointer">
        Completed {{ useTodo.completedTodos.length }}
      </summary>

      <TodoList :list="useTodo.completedTodos" />
    </details>
  </main>
</template>
