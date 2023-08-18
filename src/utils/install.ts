import type { App, Plugin } from 'vue'
import type { SFCInstallWithContext, SFCWithInstall } from './types'
import { INSTALLED_KEY } from '~/constants'

export function withInstallFunction<T>(fn: T, name: string) {
  (fn as SFCWithInstall<T>).install = (app: App) => {
    (fn as SFCInstallWithContext<T>)._context = app._context
    app.config.globalProperties[name] = fn
  }

  return fn as SFCInstallWithContext<T>
}

export function makeInstaller(components: Plugin[] = []) {
  return {
    install(app: App) {
      if ((this as any)[INSTALLED_KEY])
        return
      (this as any)[INSTALLED_KEY] = true
      components.forEach((component) => {
        app.use(component)
      })
    },
  }
}
