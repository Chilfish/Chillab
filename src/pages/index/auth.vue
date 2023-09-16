<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies'
import Toast from '@cp/Toast'
import type { AuthReturn } from '~/types'

const cookies = useCookies()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const apiSuffix = ref('login')
const apiURL = computed(() => `/api/auth/${apiSuffix.value}`)

const { username, password } = toRefs(userStore.user)
const disabled = computed(() => username.value === '' || password.value === '')

async function login() {
  useFetch(apiURL, {
    afterFetch(ctx) {
      const data = ctx.data

      cookies.set('token', data.token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month
      })
      userStore.user = data.data
      router.push(route.query.redirect as string || '/todo')
      return ctx
    },
    onFetchError(ctx) {
      const err = ctx.data
      Toast({
        message: `${err.statusCode} ${err.message}`,
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
  <div class="center-col">
    <main
      class="w-100 center-col gap-6 rounded-3 p-10 px-12"
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
  </div>
</template>
