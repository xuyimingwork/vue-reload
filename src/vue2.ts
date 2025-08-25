import * as Vue from 'vue'
import { reload } from './reload'

const _reload = (self: any) => reload(() => (self && { ...self, '$': { vnode: self.$vnode } }))

export function createReload() {
  return {
    install(Vue: any) {
      Object.defineProperty(Vue.prototype, '$reload', {
        get () { return () => _reload(this) }
      })
    }
  }
}

export function useReload(ref?: any) {
  const instance = Vue.getCurrentInstance ? Vue.getCurrentInstance() : undefined
  if (!ref) return () => _reload(instance?.proxy)
  return () => _reload(ref.value)
}