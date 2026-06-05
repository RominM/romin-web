<template>
  <ul class="tech-list">
    <li v-for="(tech, index) in techList" :key="index" class="tech-list__el">
      <a :href="tech.url">
        <img :src="tech.icon" alt="icon technologie" />
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { TTech } from '~/types/type/project';

defineProps({
  techList: { type: Array as PropType<TTech[]>, required: true },
})
</script>

<style scoped lang="scss">
.tech-list {
  display: flex;
  margin: auto;
  gap: 50px;
  &__el {
    width: 50px;
  }
}
</style>