import { nextTick, type ComponentPublicInstance } from "vue"

export function reload(instance?: ComponentPublicInstance | null) {
  if (!instance) return Promise.resolve()
  if (!instance.$ || !instance.$.vnode) return Promise.resolve()
  if (!instance.$parent) return Promise.resolve()
  instance.$.vnode.key = Symbol('refresh')
  instance.$parent.$forceUpdate()
  return nextTick()
}