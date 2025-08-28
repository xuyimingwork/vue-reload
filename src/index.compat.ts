import * as _Vue from 'vue'
import { reload } from './reload'
import { createHook, createPlugin } from '@/v3'

const Vue = _Vue.version ? _Vue : (_Vue as any).default

const _reload = (self: any) => reload(() => (self && { ...self, '$': { vnode: self.$vnode } }), { nextTick: Vue.nextTick })
function boot<Fn extends () => any>(v2: Fn, v3: Fn): ReturnType<Fn> | void {
  if (Vue.version.startsWith('2.')) return v2()
  if (Vue.version.startsWith('3.')) return v3()
}
const _useReload = createHook({ nextTick: Vue.nextTick, getCurrentInstance: Vue.getCurrentInstance })

export function createReload(): any {
  return boot(() => ({
    install(app: any) {
      const _Vue = app
      Object.defineProperty(_Vue.prototype, '$reload', {
        get () { return () => _reload(this) }
      })
    }
  }), () => createPlugin({ nextTick: Vue.nextTick }))
}

export function useReload(ref?: any) {
  return boot(
    () => {
      const instance = Vue.getCurrentInstance 
        ? Vue.getCurrentInstance() 
        : null // 非 2.7+ 版本不使用 hooks
      if (!ref) return () => _reload(instance?.proxy)
      return () => _reload(ref.value)
    },
    () => _useReload(ref)
  )
}