# vue-reload

Reload a vue component (support vue2.7 and vue3), make it go through lifecycle again.

## Install

```sh
pnpm i vue-reload
# or
npm i vue-reload
# or 
yarn add vue-reload
```

## Usage

- [Live Demo](https://play.vuejs.org/#eNqNU8tu2zAQ/BWCF7lAIsFtT64SpE1zaA9t4ebIiypRNmOKJMilY8DQv3dJWpZs2G1u3J3Zx6xGe/rZmHzrOV3Q0tVWGCCOgzf3TInOaAtkT7zjz7wzsgK+5C3pSWt1RzKsyo6sR92Z+QHIixiFtqeEE/wUjlOWXOqqmQ64tTGVfWKq1soBqddCNuTubKdZFvPZu4GWyh5Hcmo9izRklUUSizIxgEMnjAgpk5RiDLBbe8dorGV0QP54AK3IQy1FvUF4MpLR+xSldcsicbGuLCaz6A1N6m+7yuQvTiv8CvvQnB0Ax+iCxEzIjfcIaUbXAMYtisIrs1nlte6KkfEwz9/n86IRDiZZHMJoaNcz1eN4cHiuVqzOhmMrIyS3Pw0IPOfJEpWU+vV7zIH1/GbI12teby7kX9wubfvLcsftljN6xKCyKw4Jfvr9g+/wfQQ73XiJ7H+AS+609GHHRPviVYNrT3hx22/xlkKtnt3TDrhyg6iwaLxG5McDh+99Tfq47of84+SKg5sv/EOEvM3fgZmcq/QrOvYrOiTH5wy9OiAHS03t/B8nN2IbH2SojWuRClDUPk7qUULAr7h5NLLjsp34GCvQW6H7uaOPv/7Fa1zT+DYVDioQ9TUVlzfq/wLC/6hm)

> if you use with vue2.7, just change import from `vue-reload` to `vue-reload/compat`, which support both vue2.7 and vue3.

### in template

main.ts

```js
import { createApp } from 'vue'
import { createReload } from 'vue-reload';
import App from './App.vue'

const app = createApp(App)

app.use(createReload())
app.mount('#app')
```

then, you can just call `$reload()` in any component template, like:

```vue
<template>
  <button @click="$reload()">$reload</button>
</template>
```

### as hook

```vue
<script setup lang="ts">
  import { useReload } from 'vue-reload';
  const reload = useReload()
</script>
<template>
  <button @click="reload()">reload</button>
</template>
```

### from parent

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

## Next

- [x] add support for vue2.7, code like: 
  ```js
  this.$vnode.key = Symbol('reload')
  this.$parent.$forceUpdate()
  ```
- [x] support reload child component
  - since setup component has closed instance, `$reload` is not exposed, so we can't just use `$refs.xxx.$reload`: https://github.com/vuejs/core/pull/5022#issuecomment-1113325348
- [ ] add test for vue2.7
