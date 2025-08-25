<script setup lang="ts">
  import { useTemplateRef } from 'vue';
  import NeedReload from './components/NeedReload.vue';
  import ChildClosed from './components/ChildClosed.vue';
  import ChildExposed from './components/ChildExposed.vue';
  import { useReload } from '../src';

  const refChildClosed = useTemplateRef('refChildClosed')
  const reloadChildClosed = useReload(refChildClosed)

  const refChildExposed = useTemplateRef('refChildExposed')
  const reloadChildExposed = useReload(refChildExposed)
</script>

<template>
  <NeedReload />
  <div>
    <ChildClosed ref="refChildClosed" />
    <button @click="reloadChildClosed">reload from parent</button>  
  </div>
  <div>
    <ChildExposed ref="refChildExposed" />
    <button @click="reloadChildExposed">reload from parent</button>  
  </div>
</template>