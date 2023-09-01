import toast from './src/method'
import { withInstallFunction } from '~/utils/install'

export const Toast = withInstallFunction(toast, '$toast')
export default Toast
