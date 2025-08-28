import { getCurrentInstance, nextTick, type Plugin, type Ref } from 'vue'
import { createHook, createPlugin } from '@/v3'

declare module 'vue' {
  interface ComponentCustomProperties {
    $reload: () => void
  }
}

export function createReload(): Plugin {
  return createPlugin({ nextTick })
}

export const useReload: (ref?: Ref) => () => Promise<void> = createHook({ getCurrentInstance, nextTick })