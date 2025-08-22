<script setup lang="ts">
  import { useReload } from '../../src';

  const reload = useReload()
</script>

<template>
  <div>
    {{ Date.now() }}
    <button @click="$reload()">$reload</button>
    <button @click="reload()">reload</button>
  </div>
</template> 