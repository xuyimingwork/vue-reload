import { getCurrentInstance, type Plugin, type ComponentPublicInstance } from 'vue'
import { reload } from './reload'

declare module 'vue' {
  interface ComponentCustomProperties {
    $reload: () => void
  }
}

export function createReload(): Plugin {
  return {
    install(app) {
      app.config.globalProperties.$reload = function() {
        reload(this as ComponentPublicInstance)
      }
    }
  }
}

export function useReload() {
  const instance = getCurrentInstance()
  return () => reload(instance?.proxy)
}