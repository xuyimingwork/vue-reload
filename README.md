# vue-reload

reload current component.

## Install

```bash
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

HelloWorld.vue

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
