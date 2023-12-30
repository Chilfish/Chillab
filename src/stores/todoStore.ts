import { createFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { Toast } from '@cp'
import type { Todo, TodoReturn } from '~/types'

export const useTodoStore = defineStore('todo', () => {
  const newTodo = ref('')
  const todoArr = ref([] as Todo[])

  const fetcher = createFetch({
    baseUrl: '/api/p/todo',
    options: {
      beforeFetch({ options }) {
        const token = useUserStore().user.token
        options.headers = {
          Authorization: `Bearer ${token}`,
        }
        return { options }
      },

      onFetchError(ctx) {
        const err = ctx.data || ctx.error

        Toast({
          message: `${err?.statusCode} ${err?.message}`,
          type: 'error',
        })

        if (err?.statusCode === 401)
          navigateTo('/auth')

        return ctx
      },
    },
  })

  async function fetchTodos() {
    const { data, error } = await fetcher('/').json<TodoReturn>()
    if (!error.value && data.value)
      todoArr.value = data.value.data as Todo[]
  }

  async function addTodo() {
    const content = newTodo.value.trim()
    if (!content || content === '')
      return

    const { data } = await fetcher('/add')
      .post({ text: content })
      .json<TodoReturn>()

    if (data.value?.status !== 'success') {
      Toast({
        message: 'add todo failed',
        type: 'error',
      })
      return
    }

    todoArr.value.push(data.value?.data as Todo)
    newTodo.value = ''
  }

  async function deleteTodoItem(id: number) {
    const {
      data: count,
    } = await fetcher('/rm')
      .post({ id })
      .json<{ data: number }>()

    if (count.value!.data < 1) {
      Toast({
        message: 'delete todo failed',
        type: 'error',
      })
      return
    }

    todoArr.value = todoArr.value.filter(todo => todo.id !== id)
  }

  async function toggleTodoItem(todo: Todo) {
    const { id, text, completed } = todo
    const {
      data: count,
    } = await fetcher('/up')
      .post({ id, text, completed: !completed })
      .json<{ data: number }>()

    if (count.value!.data < 1) {
      Toast({
        message: 'update todo failed',
        type: 'error',
      })
      return
    }

    const index = todoArr.value.findIndex(item => item.id === todo.id)
    todo.completed = !todo.completed
    todoArr.value[index] = todo
  }

  const completedTodos = useArrayFilter(todoArr, todo => todo.completed)
  const uncompletedTodos = useArrayFilter(todoArr, todo => !todo.completed)

  return {
    newTodo,
    todoArr,
    completedTodos,
    uncompletedTodos,

    fetchTodos,
    addTodo,

    deleteTodoItem,
    toggleTodoItem,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})
