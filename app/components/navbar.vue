<template>
  <nav class='navigation'>
    <nav-list v-if="userRoutes.length > 0" :routes="userRoutes" />
  </nav>
</template>

<script setup lang='ts'>
import { useUtils } from '~/composables/global/useUtils';
import { ERoute } from '~/types/enum/global/navigation';

const userRoutes = useUtils().routes.excludes([ERoute.PRIVATE])
</script>

<style lang='scss' scoped>
  .navigation {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
  }
</style>