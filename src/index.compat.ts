import { getCurrentInstance, version } from 'vue'
import { reload } from './reload'
import { createReload as _createReload, useReload as _useReload } from './index'

const _reload = (self: any) => reload(() => (self && { ...self, '$': { vnode: self.$vnode } }))
function boot<Fn extends () => any>(v2: Fn, v3: Fn): ReturnType<Fn> | void {
  if (version.startsWith('2.')) return v2()
  if (version.startsWith('3.')) return v3()
}

export function createReload(): any {
  return boot(() => ({
    install(app: any) {
      const Vue = app
      Object.defineProperty(Vue.prototype, '$reload', {
        get () { return () => _reload(this) }
      })
    }
  }), () => _createReload())
}

export function useReload(ref?: any) {
  return boot(
    () => {
      const instance = getCurrentInstance() // v2.7 in setup
      if (!ref) return () => _reload(instance?.proxy)
      return () => _reload(ref.value)
    },
    () => _useReload(ref)
  )
}