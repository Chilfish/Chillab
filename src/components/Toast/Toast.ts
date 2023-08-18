import type { AppContext } from 'vue'
import { createVNode, render } from 'vue'
import ToastConstructor from './Toast.vue'

export interface Toast {
  (message: string, context?: AppContext): void
}

export function toast(message: string, context: AppContext) {
  const container = document.createElement('div')
  const vnode = createVNode(ToastConstructor)

  vnode.appContext = context
  render(vnode, container)

  document.body.appendChild(container.firstElementChild!)
}

export default toast as Toast
