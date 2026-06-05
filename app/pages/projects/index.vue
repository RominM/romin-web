<template>
  <div class="projects">
    <div class="fake-bento">
      <carousel>
        <list-project-cards :projects="projects" @focused-project="focusProjectId = $event" @open-modal="openModal"/>
      </carousel>

      <project-content-display v-if="project" :project="project"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalEvents } from '~/composables/global/useGlobalEvent';
import { projects } from '~/const/projects';
import { EGlobalEvent } from '~/types/enum/global/globalEvent';

const focusProjectId = ref<string>(projects[0].id)

const project = computed(() => projects.find(project => project.id === focusProjectId.value))

function openModal() {
  useGlobalEvents().emitEvent(EGlobalEvent.MODAL_PROJECT, project.value)
}
</script>

<style scoped lang="scss">
.projects {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.fake-bento {
  display: flex;
  flex-direction: column;
  // width: 750px;
  height: 100%;
}

.txt {
  color: #000;
}
</style>