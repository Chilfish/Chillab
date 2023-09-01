import { createVNode, render } from 'vue'
import type { AppContext } from 'vue'
import type { ToastFn, ToastHandler, ToastInstance, ToastOptions, ToastParams, ToastParamsNormalized } from './types'
import ToastConstructor from './Toast.vue'
import { toastDefault } from './props'
import { instances, rmInstance } from './instance'

let id_ = 0

/**
 * convert options to normalized options
 */
function normalizeOptions(params?: ToastParams): ToastParamsNormalized {
  const options: ToastOptions
  = typeof params === 'string' || !params
    ? { message: params }
    : params

  const normalized = {
    ...toastDefault,
    ...options,
  }

  if (!normalized.appendTo) {
    normalized.appendTo = document.body
  }
  else if (typeof normalized.appendTo === 'string') {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo)
    if (!appendTo)
      appendTo = document.body
    normalized.appendTo = appendTo
  }

  return normalized as ToastParamsNormalized
}

export const toast: ToastFn & Partial<ToastFn> & { _context: AppContext | null } = (
  options = {},
  context,
) => {
  const norOptions = normalizeOptions(options)
  const instance = createToast(norOptions, context)

  return instance.handler
}

function createToast(
  { appendTo, ...options }: ToastParamsNormalized,
  context?: AppContext | null,
): ToastInstance {
  const container = document.createElement('div')
  const id = `toast-${id_++}`

  const props = {
    ...options,
    id,
    onClose: () => {
      options.onClose?.()
      rmInstance(id) // 会有一个专门的 instance.ts 来管理这些实例
    },
    onDestroy: () => {
      render(null, container) // 这样就能从 body 中移除这个标签了
    },
  }

  const vnode = createVNode(ToastConstructor, props)
  vnode.appContext = context || toast._context // 上文说的要指定它的 context

  render(vnode, container) // 渲染成 HTML

  // 当 destroy 的时候，gc 会自动回收这个 div 的
  appendTo.appendChild(container.firstElementChild!)

  // Toast.vue 组件本身，目的是为了能够获取它的一些信息
  // 如高度和 offset，这样才能让 Toast 们那位置排列好而不是叠在一起
  const vm = vnode.component!

  const handler: ToastHandler = {
    close() {
      vm.exposed!.close()
    },
  }

  const instance: ToastInstance = {
    id,
    vm,
    vnode,
    handler,
    props: (vnode.component as any).props,
  }
  instances.push(instance) // 先进先出，后来者在最下面

  return instance
}

toast._context = null

export default toast as ToastFn
