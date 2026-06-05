<template>
  <div class="project-statistic">
    <p>Status : <span>{{ status }}</span></p>
    <p>Challenging level : <h-icon :icon="setIcon" /></p>
    <p>Duration : <span>{{ duration }}</span></p>
  </div>
</template>

<script setup lang="ts">
import { FullSignalIcon, LowSignalIcon, MediumSignalIcon } from '@hugeicons/core-free-icons';
import { ELevelProject, EStatusProject } from '~/types/enum/project/project';

const props = defineProps({
  status: { type: String as PropType<EStatusProject>, required: true },
  level: { type: Number as PropType<ELevelProject>, required: true },
  duration: { type: String, required: true },
})

const iconMap = {
  [ELevelProject.LOW]: LowSignalIcon,
  [ELevelProject.MEDIUM]: MediumSignalIcon,
  [ELevelProject.HIGHT]: FullSignalIcon
}

const setIcon = computed(() => iconMap[props.level])
</script>

<style scoped lang="scss">
.project-statistic {
  display: flex;
  gap: 50px;
  p {
    display: flex;
    gap: 5px;
    font-weight: 300;
    span {
      font-weight: 600;
      text-transform: capitalize;
    }
  }
}
</style>