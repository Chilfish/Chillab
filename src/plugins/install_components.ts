import components from '@cp/Plugins'

export default defineNuxtPlugin((nuxtApp) => {
  const installer = makeInstaller([...components])
  nuxtApp.vueApp.use(installer)
})
