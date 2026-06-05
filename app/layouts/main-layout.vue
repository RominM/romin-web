<template>
  <div class='default-layout'>
    <div class="cercle large"></div>
    <div class="cercle small"></div>
    <div class="cercle medium"></div>
    <layout-content>
      <slot/>
    </layout-content>

    <modal v-if="project" :is-open="isOpen" dismisable show-cross @update:isOpen="closeModal">
      <project-modal :project="project" />
    </modal>
  </div>
</template>

<script setup lang='ts'>
import { useGlobalEvents } from '~/composables/global/useGlobalEvent';
import { EGlobalEvent } from '~/types/enum/global/globalEvent';
import type { TProject } from '~/types/type/project';

useGlobalEvents().subscribeTo(EGlobalEvent.MODAL_PROJECT, (payload: TProject | undefined) => {
  project.value = payload ?? null
  isOpen.value = true
})

const isOpen = ref<boolean>(false)
const project = ref<TProject | null>(null)

function closeModal() {
  project.value =  null
  isOpen.value = false
  useGlobalEvents().unsubscribeFrom(EGlobalEvent.MODAL_PROJECT,() => {})
}
</script>

<style lang='scss' scoped>
.default-layout {
  position: relative;
  width: 100dvw;
  height: 100dvh;
  padding: 40px;
  overflow: hidden;
  background: linear-gradient(
    217deg,
    #BEE9E8 4%,
    #9FB0E8 46%,
    #E0BACF 96%
  );
  .cercle {
    position: absolute;
    border-radius: 50%;
    background-color: #0999AC;
    z-index: 0;
  }

  .large {
    top: 80px;
    right: -180px;
    width: 66vh;
    height: 66vh;
  }
  .medium {
    bottom: -40px;
    left: 20%;
    width: 40vh;
    height: 40vh;
  }

  .small {
    top: 40%;
    left: 55vh;
    width: 13vh;
    height: 13vh;
  }
}
</style>