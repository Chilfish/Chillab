<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { Toast } from '@cp'
import type { AuthReturn } from '~/types'

const cookies = useCookie('token', {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
})
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const apiSuffix = ref('login')
const apiURL = computed(() => `/api/p/auth/${apiSuffix.value}`)

const { username, password } = toRefs(userStore.user)
const disabled = computed(() => username.value === '' || password?.value === '')

async function login() {
  useFetch(apiURL, {
    afterFetch(ctx) {
      const data = ctx.data

      cookies.value = data.token
      userStore.user = data.data
      userStore.user.token = data.token

      router.push(route.query.redirect as string || '/todo')
      return ctx
    },
    onFetchError(ctx) {
      const err = ctx.data || ctx.error

      Toast({
        message: `${err?.statusCode} ${err?.message}`,
        type: 'error',
      })
      return ctx
    },
  })
    .post({
      username: username.value.trim(),
      password: password.value.trim(),
    })
    .json<AuthReturn>()
}
</script>

<template>
  <main
    class="m-auto h-80 center-col gap-6 rounded-3 p-10 px-12 md:w-100"
    bg="light-8 dark:dark-8"
  >
    <h2>Login to /Todo</h2>

    <label>
      <input
        v-model="username"
        type="text"
        placeholder="Name"
        class="input"
      >
    </label>

    <label>
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="input"
      >
    </label>

    <div class="btns center gap-4">
      <button
        :disabled="disabled"
        @click="(apiSuffix = 'register', login())"
      >
        Register
      </button>

      <button
        :disabled="disabled"
        @click="(apiSuffix = 'login', login())"
      >
        Login
      </button>
    </div>
  </main>
</template>
