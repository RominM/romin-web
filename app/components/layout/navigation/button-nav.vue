<template>
  <li>
    <NuxtLink class='button-nav' :to="route.path">
      <button>{{ route.name }}</button>
    </NuxtLink>
  </li>
</template>

<script setup lang='ts'>
import type { RouteRecordNormalized } from 'vue-router'
const { route } = defineProps({ route: { type: Object as PropType<RouteRecordNormalized>, required: true } })
</script>

<style lang='scss' scoped>
  .button-nav{
    
  }
</style>