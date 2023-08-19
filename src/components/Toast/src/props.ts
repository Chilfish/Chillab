import type { PropType } from 'vue'

export const definePropType = <T>(val: any): PropType<T> => val

export const toastDefault = {
  id: '',
  message: '',
  type: 'info',
  appendTo: document.body,
  offset: 16,
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

  offset: {
    type: Number,
    default: toastDefault.offset,
  },

  type: {
    type: String,
    default: toastDefault.type,
  },

  onClose: {
    type: definePropType<() => void>(Function),
    required: false,
  },

  onDestroy: {
    type: definePropType<(e: TransitionEvent) => void>(Function),
    required: false,
  },
} as const
