简体中文 | [English](../../README.md)

# vue-reload

重载（刷新）组件，让组件重新经历全部生命周期（支持 vue2.3+ 和 vue3）。

> 比如你有一个详情组件，接收ID，并在生命周期中执行复杂的初始化、请求数据、渲染等操作，在提交某个更改到服务端后，你可能想让这个详情组件重新加载，重新执行整个生命周期，在这种场景下，vue-reload 很好用。

## 安装

```sh
pnpm i vue-reload
# 或
npm i vue-reload
# 或 
yarn add vue-reload
```

## 使用

- [在线演示](https://play.vuejs.org/#eNqNU8tu2zAQ/BWCF7lAIsFtT64SpE1zaA9t4ebIiypRNmOKJMilY8DQv3dJWpZs2G1u3J3Zx6xGe/rZmHzrOV3Q0tVWGCCOgzf3TInOaAtkT7zjz7wzsgK+5C3pSWt1RzKsyo6sR92Z+QHIixiFtqeEE/wUjlOWXOqqmQ64tTGVfWKq1soBqddCNuTubKdZFvPZu4GWyh5Hcmo9izRklUUSizIxgEMnjAgpk5RiDLBbe8dorGV0QP54AK3IQy1FvUF4MpLR+xSldcsicbGuLCaz6A1N6m+7yuQvTiv8CvvQnB0Ax+iCxEzIjfcIaUbXAMYtisIrs1nlte6KkfEwz9/n86IRDiZZHMJoaNcz1eN4cHiuVqzOhmMrIyS3Pw0IPOfJEpWU+vV7zIH1/GbI12teby7kX9wubfvLcsftljN6xKCyKw4Jfvr9g+/wfQQ73XiJ7H+AS+609GHHRPviVYNrT3hx22/xlkKtnt3TDrhyg6iwaLxG5McDh+99Tfq47of84+SKg5sv/EOEvM3fgZmcq/QrOvYrOiTH5wy9OiAHS03t/B8nN2IbH2SojWuRClDUPk7qUULAr7h5NLLjsp34GCvQW6H7uaOPv/7Fa1zT+DYVDioQ9TUVlzfq/wLC/6hm)

> 如果你使用 vue2.x 版本，只需将导入从 `vue-reload` 更换为 `vue-reload/compat` 即可，`vue-reload/compat` 支持 vue2.3+ 和 vue3

### 模板内

在入口文件（通常是 main.ts）中注册全局方法 `$reload`

```js
import { createApp } from 'vue'
import { createReload } from 'vue-reload';
import App from './App.vue'

const app = createApp(App)

app.use(createReload())
app.mount('#app')
```

> 对于 Vue2：`Vue.use(createReload())`

然后，你可以在任意组件模板内调用 `$reload()`，如：

```vue
<template>
  <button @click="$reload()">$reload</button>
</template>
```

> **不要** 像 `<button @click="$reload">$reload</button>` 使用 `$reload`。因为 `$reload` 内部使用 `this` 指向当前组件，`$reload` 会导致 `this` 指向按钮。

### setup 内

```vue
<script setup lang="ts">
  import { useReload } from 'vue-reload';
  const reload = useReload()
</script>
<template>
  <button @click="reload()">reload</button>
</template>
```

### 在父组件中

```vue
<script setup lang="ts">
  import { useTemplateRef } from 'vue';
  import { useReload } from 'vue-reload';
  import Child from './Child.vue'

  const refChild = useTemplateRef('refChild')
  const reloadChild = useReload(refChild)
</script>
<template>
  <Child ref="refChild" />
  <button @click="reloadChild()">reloadChild</button>
</template>
```

> 如果你注册了全局方法 `$reload` **并且** 使用 vue 2.x，你可以直接通过 `$refs.refChild.$reload()` 调用。
> 由于 vue3 引入了 [封闭实例](https://github.com/vuejs/core/pull/5022#issuecomment-1113325348)，无法从 ref 访问全局方法，因此 vue3 内更推荐使用 composable 触发子组件刷新。