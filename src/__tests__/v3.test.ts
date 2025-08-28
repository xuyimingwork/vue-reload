import { test } from "vitest"
import { createHook, createPlugin } from '../v3'
import { expect } from "vitest"

test('v3 plugin', async () => {
  const plugin = createPlugin({})
  expect(plugin.install).not.toBeUndefined()
})

test('v3 hook', async () => {
  const hook = createHook({})
  expect(typeof hook()).toBe('function')
})
