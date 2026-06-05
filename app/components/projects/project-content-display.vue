<template>
  <div class="project-content-display">
    <div :class="{ variant }">
      <h2 class="project-content-display__name" :class="{ variant }">{{ project.name }}</h2>
      
      <project-statistic :status="project.status" :level="project.level" :duration="project.duration" />
    </div>

    <p class="project-content-display__description" :class="{ variant }">{{ project.description }}</p>

    <tech-list v-if="!variant" :tech-list="project.tech" />
  </div>
</template>

<script setup lang="ts">
import type { TProject } from '~/types/type/project';

defineProps({
  project: { type: Object as PropType<TProject>, required: true },
  variant: { type: Boolean, default: false }
})
</script>

<style scoped lang="scss">
.project-content-display {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px 20px;
  color: #000;
  .variant {
    display: flex;
    align-items: center;
    gap: 50px;
  }
  &__name {
    text-align: center;
    margin-bottom: 20px;
    font-size: 32px;
    &.variant {
      text-align: left;
      margin-bottom: 0;
    }
  }

  &__description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 300;

    &.variant {
      display: block;
      -webkit-line-clamp: none;
      -webkit-box-orient: unset;
      overflow: visible;
      text-overflow: unset;
    }
  }
}
</style>