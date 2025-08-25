import { nextTick, type ComponentPublicInstance } from "vue"

export function reload(): Promise<void>
export function reload(instance: ComponentPublicInstance | null | undefined): Promise<void>
export function reload(getInstance: () => ComponentPublicInstance | null | undefined): Promise<void>
export function reload(maybeGetInstance?: any) {
  const instance = typeof maybeGetInstance === 'function' ? maybeGetInstance() : maybeGetInstance
  if (!instance) return Promise.resolve()
  if (!instance.$ || !instance.$.vnode) return Promise.resolve()
  if (!instance.$parent) return Promise.resolve()
  instance.$.vnode.key = Symbol ? Symbol('reload') : 'reload'
  instance.$parent.$forceUpdate()
  return nextTick()
}