import { expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { reload } from '../reload'
import { getCurrentInstance, ref } from 'vue'

test('reload', async () => {
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