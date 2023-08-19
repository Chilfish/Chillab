import { createVNode, render } from 'vue'
import type { AppContext, PropType } from 'vue'
import ToastConstructor from './Toast.vue'
import type { ToastContext, ToastFn, ToastHandler, ToastOptions, ToastParams, ToastParamsNormalized } from './types'

const definePropType = <T>(val: any): PropType<T> => val

const toastDefault = {
  id: '',
  message: '',
  appendTo: document.body,
  onClose: undefined,
} as const

export const toastProps = {
  id: {
    type: String,
    default: toastDefault.id,
  },

  message: {
    type: String,
    default: toastDefault.message,
  },

  onClose: {
    type: definePropType<() => void>(Function),
    required: false,
  },
} as const

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
): ToastContext {
  const container = document.createElement('div')
  const id = `toast-${id_++}`

  const props = {
    ...options,
    id,
  }

  const vnode = createVNode(ToastConstructor, props)
  vnode.appContext = context || toast._context

  render(vnode, container)

  appendTo.appendChild(container.firstElementChild!)

  const vm = vnode.component!
  const handler: ToastHandler = {
    close() {
      vm.exposed?.close()
    },
  }

  const instance: ToastContext = {
    id,
    props: (vnode.component as any).props,
    handler,
  }

  return instance
}

toast._context = null

export default toast as ToastFn
