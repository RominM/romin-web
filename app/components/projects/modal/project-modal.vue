<template>
  <div class="project-modal">
    <project-banner :picture="project.picture" :links="project.links"/>

    <project-content-display :project="project" variant />
  </div>
</template>

<script setup lang="ts">
import type { TProject } from '~/types/type/project';

defineProps({
  project: { type: Object as PropType<TProject>, required: true }
})
</script>

<style scoped lang="scss">
.project-modal {
  display: flex;
  flex-direction: column;
  gap: 20px;
  :deep(.project-content-display) {
    color: #fff;
  }
}
</style>