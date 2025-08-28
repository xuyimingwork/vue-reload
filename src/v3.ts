import { reload } from "@/reload";
import type { Context } from "@/types";

export function createPlugin({ nextTick }: Context) {
  return {
    install(app: any) {
      app.config.globalProperties.$reload = function() {
        return reload(this, { nextTick })
      }
    }
  }
}

export function createHook({ nextTick, getCurrentInstance }: Context) {
  return function useReload(ref?: any) {
    const instance = getCurrentInstance ? getCurrentInstance() : null
    if (!ref) return () => reload(instance?.proxy, { nextTick })
    return () => reload(() => ref.value?.$?.proxy, { nextTick })
  }
}