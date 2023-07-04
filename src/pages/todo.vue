<script setup lang="ts">
import { computed, ref } from 'vue'
import TodoItem from '@cp/TodoItem.vue'
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

function toggleDone(todo: todoItem) {
  todo.done = !todo.done
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
</script>

<template>
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

    <ul w-full sm:w-xl>
      <li v-for="todo in uncompletedTodos" :key="todo.id">
        <TodoItem
          :item="todo"
          @toggle="toggleDone(todo)"
          @delete="deleteTodoItem(todo)"
        />
      </li>
    </ul>

    <details
      v-if="completedTodos.length"
      open
      w-full sm:w-xl
    >
      <summary
        mb-2 mt-4 cursor-pointer
      >
        Completed {{ completedTodos.length }}
      </summary>

      <ul>
        <li v-for="todo in completedTodos" :key="todo.id">
          <TodoItem
            :item="todo"
            @toggle="toggleDone(todo)"
            @delete="deleteTodoItem(todo)"
          />
        </li>
      </ul>
    </details>
  </main>
</template>
