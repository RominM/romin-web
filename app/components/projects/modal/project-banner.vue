<template>
  <div class="project-banner">
    <div class="slides">
      <img
        v-for="(img, i) in picture.src_l"
        :key="img"
        class="slide"
        :src="img"
        :alt="picture.alt"
        :class="{ active: i === currentIndex }"
      />
    </div>

     <div class="project-banner--actions">
      <a :href="links.website" target="_blank">
        <button class="visitng cta">
          <h-icon :icon="Cursor02Icon" size="27"/>
          visitng
        </button>
      </a>

      <a v-if="links.code" :href="links.code" target="_blank">
        <button class="view-code cta">
          <h-icon :icon="SourceCodeSquareIcon" size="25"/>
          code base
        </button>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cursor02Icon, SourceCodeSquareIcon } from '@hugeicons/core-free-icons';
import type { TPicture, TProjectLinks } from '~/types/type/project';

const props = defineProps({
  links: { type: Object as PropType<TProjectLinks>, required: true },
  picture: { type: Object as PropType<TPicture>, required: true },
})


const currentIndex = ref<number>(0)
let intervalId: number

const duration = 4000

onMounted(() => {
  intervalId = window.setInterval(() => {
    currentIndex.value =
      (currentIndex.value + 1) % props.picture.src_l.length
  }, duration)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped lang="scss">
.project-banner {
  position: relative;
  overflow: hidden;

  .slides {
    position: relative;
    width: 85vw;
    height: 55vh;
    border-radius: 20px;
    overflow: hidden;
    .slide {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.05);
      opacity: 0;
      transition: opacity 1.3s ease, transform 9s linear;
      &.active {
        opacity: 1;
        transform: scale(1.15);
      }
    }
  }

  &--actions {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 20px;
    opacity: 0;
    transition: 0.3s ease;
    z-index: 2;
    .cta {
      width: 250px;
    }
    .visitng {
      background-color: #6B4494;
    }
    .view-code {
      background-color: #EB8744;
    }
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.3s ease;
    z-index: 1;
  }

  &:hover {
    &::after {
      background-color: rgba(0, 0, 0, 0.4);
    }
    .project-banner--actions {
      opacity: 1;
    }
  }
}
</style>