<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import type { Todo } from '~/types'

definePageMeta({
  middleware: ['auth'],
})

const todoStore = useTodoStore()

const {
  define: TemplateTodoList,
  reuse: TodoList,
} = createReusableTemplate<{ list: Todo[] }>()

useSortable('#completed', todoStore.completedTodos, {
  animation: 150,
})

useSortable('#uncompleted', todoStore.uncompletedTodos, {
  animation: 150,
})
</script>

<template>
  <main class="w-90% flex flex-col overflow-hidden md:w-60%">
    <!-- only one root element -->
    <TemplateTodoList v-slot="{ list }">
      <transition-group
        :id="list === todoStore.completedTodos ? 'completed' : 'uncompleted'"
        tag="ul"
        name="fade"
        class="relative w-full center flex-col gap-2"
      >
        <li
          v-for="todo in list"
          :key="todo.id"
          class="w-full"
        >
          <TodoItem
            :item="todo"
            @toggle="todoStore.toggleTodoItem(todo.id)"
            @delete="todoStore.deleteTodoItem(todo.id)"
          />
        </li>
      </transition-group>
    </TemplateTodoList>

    <h2> Chill Todo List </h2>
    <label class="my-6 w-full flex">
      <input
        v-model="todoStore.newTodo"
        type="text"
        placeholder="Add a new todo"
        class="mr-3 h-14 w-full rounded-3 bg-[--gray] p-3"
        @keyup.enter="todoStore.addTodo"
      >
      <button
        class="h-14 w-18 rounded-3 btn"
        @click="todoStore.addTodo"
      >
        Add
      </button>
    </label>

    <TodoList :list="todoStore.uncompletedTodos" />

    <details
      v-show="todoStore.completedTodos.length"
      open
    >
      <summary class="mb-2 mt-4 cursor-pointer">
        Completed {{ todoStore.completedTodos.length }}
      </summary>

      <TodoList :list="todoStore.completedTodos" />
    </details>
  </main>
</template>
