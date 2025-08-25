import { getCurrentInstance, version, type Plugin, type ComponentPublicInstance, type ComputedRef, type Ref } from 'vue'
import { reload } from './reload'

const _reload = (self: any) => reload(() => (self && { ...self, '$': { vnode: self.$vnode } }))
function boot<Fn extends () => any>(v2: Fn, v3: Fn): ReturnType<Fn> | void {
  if (version.startsWith('2.')) return v2()
  if (version.startsWith('3.')) return v3()
}

export function createReload(): Plugin {
  return {
    install(app) {
      boot(
        () => {
          const Vue = app as any        
          Object.defineProperty(Vue.prototype, '$reload', {
            get () { return () => _reload(this) }
          })
        },
        () => {
          app.config.globalProperties.$reload = function() {
            return reload(this as ComponentPublicInstance)
          }
        }
      )
    }
  }
}

export function useReload(ref?: Ref | ComputedRef) {
  return boot(
    () => {
      const instance = getCurrentInstance()
      if (!ref) return () => _reload(instance?.proxy)
      return () => _reload(ref.value)
    },
    () => {
      const instance = getCurrentInstance()
      if (!ref) return () => reload(instance?.proxy)
      return () => reload(() => ref.value?.$?.proxy)
    }
  )
}