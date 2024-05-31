import type { AppContext, ComponentInternalInstance, ExtractPropTypes, VNode } from 'vue'
import type { toastProps } from './props'

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export type ToastProps = ExtractPropTypes<
  Omit<typeof toastProps, 'type'> & {
    readonly type?: ToastType // 这是为了将 string 类型转为上面那几种
  }
>

// 从 props 中排除掉 id 并全设为可选的
// 同时 appendTo 是在 createVNode 那边指定的，并不在 Toast.vue 中，所以要另外指定，这也是可选的
export type ToastOptions = Partial<Omit<ToastProps, 'id'>> & {
  appendTo?: HTMLElement
}

// Toast 的参数，string 或是 options 对象
export type ToastParams = ToastOptions | ToastOptions['message']

// 为了能够将纯 string 解析为原先默认的 options 对象
// 这里就全是必选的
export type ToastParamsNormalized = Omit<ToastProps, 'id'> & {
  appendTo: HTMLElement
}

// Toast 函数的返回，为了能让调用方手动提前 close
export interface ToastHandler {
  close: () => void
}

// Toast 函数本体
export interface ToastFn {
  (options?: ToastParams, context?: AppContext | null): ToastHandler
}

// 包含 Toast 信息的实例
export interface ToastInstance {
  id: string
  props: ToastProps
  vm: ComponentInternalInstance
  vnode: VNode
  handler: ToastHandler
}
