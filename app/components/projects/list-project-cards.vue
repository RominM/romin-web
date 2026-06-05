<template>
  <ul class="list-project-cards">
    <li v-for="(project, index) in projects" :key="index">
      <project-card
        :picture="project.picture"
        :id="project.id"
        :is-hovered="hoveredIndex === index"
        @hover="whileHovering(index, project.id)"
        @leave="onLeave"
        @click="emit('open-modal', project.id)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { TProject } from "~/types/type/project";

const emit = defineEmits(["focused-project", "open-modal"]);

defineProps({
  projects: { type: Array as PropType<TProject[]>, required: true },
});

const hoveredIndex = ref<number | null>(null);
let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

function whileHovering(index: number, projectId: string) {
  if (hoverTimeout) clearTimeout(hoverTimeout);

  hoverTimeout = setTimeout(() => {
    hoveredIndex.value = index;
    emit("focused-project", projectId);
    hoverTimeout = null;
  }, 300);
}

function onLeave() {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }
  hoveredIndex.value = null;
}
</script>

<style scoped lang="scss">
.list-project-cards {
  display: flex;
  width: 100%;
  overflow: visible;
}
</style>
