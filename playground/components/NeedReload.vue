<script setup lang="ts">
  import { useReload } from '../../src';

  const reload = useReload()
</script>

<template>
  <div>
    {{ Date.now() }}
    <button @click="$reload()">$reload by plugin</button>
    <button @click="reload()">reload from child</button>
  </div>
</template> 