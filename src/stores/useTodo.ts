import { defineStore } from 'pinia'
import type { todoItem } from '~/types'

export const useTodoStore = defineStore('todo', () => {
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

  function deleteTodoItem(id: string) {
    todoArr.value = todoArr.value.filter(todo => todo.id !== id)
  }

  function toggleTodoItem(id: string) {
    todoArr.value = todoArr.value.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done,
        }
      }
      return todo
    })
  }

  const completedTodos = useArrayFilter(todoArr, todo => todo.done)
  const uncompletedTodos = useArrayFilter(todoArr, todo => !todo.done)

  return {
    newTodo,
    todoArr,
    completedTodos,
    uncompletedTodos,
    addTodo,
    deleteTodoItem,
    toggleTodoItem,
  }
}, {
  persist: true,
})
