<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import TodoItem from './TodoItem.vue'
import type { todoItem } from '~/types'

const newTodo = ref<string>('')

const todoArr = ref<todoItem[]>([
  { id: '1', content: 'Buy a car', done: false },
  { id: '2', content: 'Buy a house', done: false },
  { id: '3', content: 'Buy a boat', done: false },
])

const toggle = computed(() => {
  return (id: string) => {
    const index = todoArr.value.findIndex(todo => todo.id === id)
    todoArr.value[index].done = !todoArr.value[index].done
  }
})

const deleteTodo = computed(() => {
  return (id: string) => {
    const index = todoArr.value.findIndex(todo => todo.id === id)
    todoArr.value.splice(index, 1)
  }
})

function addTodo() {
  if (newTodo.value) {
    todoArr.value.push({
      id: Date.now().toString(),
      content: newTodo.value,
      done: false,
    })
    newTodo.value = ''
  }
}

watch(todoArr, () => {
  // console.log(todoArr.value)
}, { deep: true })
</script>

<template>
  <main flex flex-col>
    <h1 text-2xl font-bold my-xl>
      Chill Todo List
    </h1>
    <label flex my-4>
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
      <li v-for="todo in todoArr" :key="todo.id">
        <TodoItem
          :item="todo"
          @toggle="toggle"
          @delete="deleteTodo"
        />
      </li>
    </ul>
  </main>
</template>
