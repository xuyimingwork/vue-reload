import { expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { reload } from '../reload'
import { getCurrentInstance, ref } from 'vue'

test('normal component', async () => {
  const data = { init: () => {} }
  const init = vi.spyOn(data, 'init')
  expect(init).not.toBeCalled()
  const wrapper = mount({
    template: '<NeedReload ref="refNeedReload" />',
    setup() {
      const refNeedReload = ref()
      return { refNeedReload }
    },
    components: {
      NeedReload: {
        template: '<div>need reload</div>',
        setup() {
          const instance = getCurrentInstance()
          data.init()
          return {
            reload: () => reload(instance?.proxy)
          }
        }
      }
    }
  })
  expect(init).toBeCalled()
  await (wrapper.vm.$refs.refNeedReload as any)?.reload()
  expect(init).toBeCalledTimes(2)
})

test('root component', async () => {
  const wrapper = mount({
    template: '<div />',
  })
  const $root = wrapper.vm.$root
  expect(await reload(() => $root)).toBeUndefined()
})

test('illegal component', async () => {
  expect(await reload(() => ({} as any))).toBeUndefined()
})

export function mockSymbolNotExist() {
  // 保存原始状态
  const original = {
    globalThis: globalThis.Symbol,
    window: typeof window !== 'undefined' ? window.Symbol : undefined,
  };

  // 移除 Symbol
  if (typeof globalThis.Symbol !== 'undefined') {
    // @ts-ignore
    delete globalThis.Symbol;
  }
  if (typeof window !== 'undefined' && typeof window.Symbol !== 'undefined') {
    // @ts-ignore
    delete window.Symbol;
  }

  // 返回清理函数（用于恢复状态）
  return () => {
    if (original.globalThis !== undefined) {
      globalThis.Symbol = original.globalThis;
    }
    if (typeof window !== 'undefined' && original.window !== undefined) {
      window.Symbol = original.window;
    }
  };
}

test('Symbol not exist', async () => {
  const cleanup = mockSymbolNotExist();

  try {
    expect(typeof Symbol).toBe('undefined');
    const wrapper = mount({
      template: '<NeedReload ref="refNeedReload" />',
      setup() {
        const refNeedReload = ref()
        return { refNeedReload }
      },
      components: {
        NeedReload: {
          template: '<div>need reload</div>',
          setup() {
            const instance = getCurrentInstance()
            return {
              reload: () => reload(instance?.proxy)
            }
          }
        }
      }
    })
    expect(await (wrapper.vm.refNeedReload as any)?.reload()).toBeUndefined()
  } finally {
    cleanup(); // 确保清理
  }
});