import { getCurrentInstance, type ComponentPublicInstance, type Plugin, type Ref } from 'vue'
import { reload } from './reload'

declare module 'vue' {
  interface ComponentCustomProperties {
    $reload: () => void
  }
}

export function createReload(): Plugin {
  return {
    install(app: any) {
      app.config.globalProperties.$reload = function() {
        return reload(this as ComponentPublicInstance)
      }
    }
  }
}

export function useReload(ref?: Ref) {
  const instance = getCurrentInstance()
  if (!ref) return () => reload(instance?.proxy)
  return () => reload(() => ref.value?.$?.proxy)
}