import toast from './Toast'
import { withInstallFunction } from '~/utils/install'

export const Toast = withInstallFunction(toast, 'toast')
export default Toast
