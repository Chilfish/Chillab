import type { AppContext, ExtractPropTypes } from 'vue'
import type { toastProps } from './Toast'

export type ToastProps = ExtractPropTypes<typeof toastProps>

export type ToastOptions = Partial<Omit<ToastProps, 'id'>> & {
  appendTo?: HTMLElement
}

export type ToastParams = ToastOptions | ToastOptions['message']

export type ToastParamsNormalized = Omit<ToastProps, 'id'> & {
  appendTo: HTMLElement
}

export interface ToastHandler {
  close(): void
}

export interface ToastFn {
  (options?: ToastParams, context?: AppContext | null): ToastHandler
}

export interface ToastContext {
  id: string
  props: ToastProps
  handler: ToastHandler
}