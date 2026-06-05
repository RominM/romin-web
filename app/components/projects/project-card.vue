<template>
  <div
    ref="cardRef"
    :class="['project-card', { hovered: isHovered }]"
    @mouseenter="$emit('hover')"
    @mouseleave="onLeave"
    @mousemove="onMouseMove"
  >
    <div
      class="project-card__glow"
      :style="{ backgroundImage: `url(${picture.src_m})` }"
    />

    <img
      ref="imgRef"
      class="project-card__img"
      :src="picture.src_m"
      :alt="picture.alt"
    />

    <div class="project-card__shine" :style="shineStyle" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { TPicture } from "~/types/type/project";

const props = defineProps({
  id: { type: String, required: true },
  picture: { type: Object as PropType<TPicture>, required: true },
  isHovered: { type: Boolean, required: true },
});

const emit = defineEmits(["hover", "leave"]);

const cardRef = ref<HTMLElement | null>(null);
const tiltX = ref(0);
const tiltY = ref(0);
const mouseX = ref(50);
const mouseY = ref(50);

const shineStyle = computed(() => ({
  background: `radial-gradient(circle at ${mouseX.value}% ${mouseY.value}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 38%)`,
}));

watch(
  () => props.isHovered,
  (val) => {
    if (!cardRef.value) return;
    if (val) {
      cardRef.value.style.transform = `perspective(800px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg) scale(1.2) translateY(-20px)`;
    } else {
      cardRef.value.style.transform = "";
    }
  },
);

function onMouseMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  tiltX.value = -((y - cy) / cy) * 12;
  tiltY.value = ((x - cx) / cx) * 18;
  mouseX.value = (x / rect.width) * 100;
  mouseY.value = (y / rect.height) * 100;

  if (!props.isHovered) return;
  el.style.transform = `perspective(800px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg) scale(1.2) translateY(-20px)`;
}

function onLeave(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  el.style.transform = "";
  emit("leave");
}
</script>

<style scoped lang="scss">
.project-card {
  position: relative;
  width: 230px;
  height: 40dvh;
  border-radius: 24px;
  margin-right: -60px;
  overflow: visible;
  transition:
    transform 0.5s ease,
    margin-right 0.4s ease;
  transform-style: preserve-3d;
  transform: scale(0.9) perspective(800px) rotateY(35deg);
  box-shadow: -15px 3px 30px #000000b2;
  cursor: pointer;

  &__glow {
    position: absolute;
    inset: -15px;
    border-radius: 26px;
    background-size: cover;
    background-position: center;
    transform: scale(1.02);
    filter: blur(28px) saturate(2.5) brightness(1.2);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 14px;
    display: block;
  }

  &__shine {
    position: absolute;
    inset: 0;
    border-radius: 14px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &.hovered {
    margin-right: -30px;
    z-index: 10;
    .project-card__glow {
      opacity: 0.8;
    }

    .project-card__shine {
      opacity: 1;
    }
  }
}
</style>
