# vue-reload

reload current vue component

## Install

```sh
pnpm i vue-reload
# or
npm i vue-reload
# or 
yarn add vue-reload
```

## Usage

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

then, you can just call `$reload()` in any non root component template, like:

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

## Next

- [ ] add support for vue2
- [ ] support reload child component
  - since setup component has closed instance, `$reload` is not exposed, so we can't just use `$refs.xxx.$reload`: https://github.com/vuejs/core/pull/5022#issuecomment-1113325348
