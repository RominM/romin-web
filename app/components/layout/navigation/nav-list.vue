<template>
  <ul class='nav-list'>
    <button-nav v-for="route in sortedRoutes" :key="route?.name" :route="route" />
  </ul>
</template>

<script setup lang='ts'>
import type { RouteRecordNormalized } from 'vue-router';
const props = defineProps({ routes: { type: Array as PropType<RouteRecordNormalized[]>, required: true } })

const desiredOrder = ['projects', 'about', 'experiences', 'contact']

const sortedRoutes = computed(() =>
  desiredOrder
    .map(name => props.routes.find(r => r.name === name))
    .filter(Boolean) as RouteRecordNormalized[]
)

</script>

<style lang='scss' scoped>
  .nav-list{
    display: flex;
    gap: 10px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>