import type { AppContext } from 'vue'
import { createVNode, render } from 'vue'
import ToastConstructor from './Toast.vue'

export interface Toast {
  (message: string, context?: AppContext | null): void
}

export const toast: Toast = (message, context) => {
  const container = document.createElement('div')

  const props = {
    message,
  }
  const vnode = createVNode(ToastConstructor, props)

  vnode.appContext = context || null
  render(vnode, container)

  document.body.appendChild(container.firstElementChild!)
}

export default toast as Toast
