<script setup lang="ts">
import type { Todo } from '~/types'

definePageMeta({
  middleware: ['auth'],
})

const { completedTodos, newTodo, uncompletedTodos } = storeToRefs(useTodoStore())
const { fetchTodos, toggleTodoItem, deleteTodoItem, addTodo } = useTodoStore()

const {
  define: TemplateTodoList,
  reuse: TodoList,
} = createReusableTemplate<{ list: Todo[] }>()

onMounted(async () => {
  await fetchTodos()
})
</script>

<template>
  <main class="w-90% flex flex-col overflow-hidden md:w-60%">
    <!-- only one root element -->
    <TemplateTodoList v-slot="{ list }">
      <transition-group
        :id="list === completedTodos ? 'completed' : 'uncompleted'"
        tag="ul"
        name="fade"
        class="relative w-full center flex-col gap-2"
      >
        <li
          v-for="todo in list"
          :key="todo.id"
          class="w-full"
        >
          <todo-item
            :item="todo"
            @toggle="toggleTodoItem(todo)"
            @delete="deleteTodoItem(todo.id)"
          />
        </li>
      </transition-group>
    </TemplateTodoList>

    <h2> Chill Todo List </h2>
    <label class="my-6 w-full flex">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Add a new todo"
        class="mr-3 h-14 w-full rounded-3 bg-[--gray] p-3"
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
