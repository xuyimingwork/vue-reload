import { expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { getCurrentInstance, useTemplateRef } from 'vue'
import { createReload, useReload } from '..'

test('plugin', async () => {
  const data = { init: () => {} }
  const init = vi.spyOn(data, 'init')
  expect(init).not.toBeCalled()
  const wrapper = mount({
    template: '<NeedReload ref="refNeedReload" />',
    setup() {
      const refNeedReload = useTemplateRef('refNeedReload')
      return { refNeedReload }
    },
    components: {
      NeedReload: {
        template: '<div>need reload</div>',
        setup() {
          const instance = getCurrentInstance()
          data.init()
          return {
            reload: () => instance?.proxy?.$reload()
          }
        }
      }
    }
  }, { global: { plugins: [createReload()] } })
  expect(init).toBeCalled()
  await (wrapper.vm.refNeedReload as any)?.reload()
  expect(init).toBeCalledTimes(2)
})

test('plugin invalid this', async () => {
  const data = { init: () => {} }
  const init = vi.spyOn(data, 'init')
  expect(init).not.toBeCalled()
  const wrapper = mount({
    template: '<NeedReload ref="refNeedReload" />',
    components: {
      NeedReload: {
        template: `
          <button id="b1" @click="$reload">need reload</button>
          <button id="b2" @click="$reload()">need reload</button>
        `,
        setup() {
          data.init()
        }
      }
    }
  }, { global: { plugins: [createReload()] } })
  expect(init).toBeCalled()
  // # click b1 not work, because b1's this is not valid
  await wrapper.find('#b1').trigger('click')
  expect(init).toBeCalledTimes(1)
  await wrapper.find('#b2').trigger('click')
  expect(init).toBeCalledTimes(2)
})

test('useReload', async () => {
  const data = { init: () => {} }
  const init = vi.spyOn(data, 'init')
  expect(init).not.toBeCalled()
  const wrapper = mount({
    template: '<NeedReload ref="refNeedReload" />',
    setup() {
      const refNeedReload = useTemplateRef('refNeedReload')
      return { refNeedReload }
    },
    components: {
      NeedReload: {
        template: '<div>need reload</div>',
        setup() {
          data.init()
          const reload = useReload()
          return {
            reload
          }
        }
      }
    }
  })
  expect(init).toBeCalled()
  await (wrapper.vm.refNeedReload as any)?.reload()
  expect(init).toBeCalledTimes(2)
})

test('useReload from parent', async () => {
  const data = { init: () => {} }
  const init = vi.spyOn(data, 'init')
  expect(init).not.toBeCalled()
  const wrapper = mount({
    template: '<NeedReload ref="refNeedReload" />',
    setup() {
      const refNeedReload = useTemplateRef('refNeedReload')
      const reloadNeedReload = useReload(refNeedReload)
      return { reloadNeedReload }
    },
    components: {
      NeedReload: {
        template: '<div>need reload</div>',
        setup() {
          data.init()
        }
      }
    }
  })
  expect(init).toBeCalled()
  await (wrapper.vm as any).reloadNeedReload()
  expect(init).toBeCalledTimes(2)
})

test('useReload from parent, not a component', async () => {
  const wrapper = mount({
    template: '<div ref="refDiv" />',
    setup() {
      const refDiv = useTemplateRef('refDiv')
      const reloadDiv = useReload(refDiv)
      return { reloadDiv }
    }
  })
  const result = await (wrapper.vm as any).reloadDiv()
  expect(result).toBeUndefined()
})
