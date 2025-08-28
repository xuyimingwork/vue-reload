import type { Context } from "@/types"
import type { ComponentPublicInstance } from "vue"

export function reload(instance: ComponentPublicInstance | null | undefined, context?: Context): Promise<void>
export function reload(getInstance: () => ComponentPublicInstance | null | undefined, context?: Context): Promise<void>
export function reload(maybeGetInstance?: any, context?: Context) {
  const instance = typeof maybeGetInstance === 'function' ? maybeGetInstance() : maybeGetInstance
  if (!instance) return Promise.resolve()
  if (!instance.$ || !instance.$.vnode) return Promise.resolve()
  if (!instance.$parent) return Promise.resolve()
  instance.$.vnode.key = typeof Symbol === 'function' ? Symbol('reload') : 'reload'
  instance.$parent.$forceUpdate()
  return context?.nextTick ? context?.nextTick() : new Promise((resolve) => setTimeout(resolve))
}