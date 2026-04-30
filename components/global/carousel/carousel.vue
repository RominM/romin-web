<template>
  <div class="carousel-wrapper">
    <button class="arrow left" @click="prev">
      <span>&#10094;</span>
    </button>

    <div class="carousel-container" ref="container">
      <slot />
    </div>

    <button class="arrow right" @click="next">&#10095;</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const container = ref<HTMLElement | null>(null);
const scrollAmount = 250;

const prev = () => {
  if (container.value)
    container.value.scrollBy({ left: -scrollAmount, behavior: "smooth" });
};

const next = () => {
  if (container.value)
    container.value.scrollBy({ left: scrollAmount, behavior: "smooth" });
};
</script>

<style scoped lang="scss">
.carousel-wrapper {
  position: relative;
  width: 100%;
  height: fit-content;
  overflow: visible;
}

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 200px 100px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.carousel-container::-webkit-scrollbar {
  display: none;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 50%;
  min-height: 120px;
  padding: 0 5px;
  background: none;
  border: none;
  font-size: 2rem;
  background-color: #ffffff1c;
  color: #ebebebcb;
  cursor: pointer;
  z-index: 10;
  user-select: none;
  transition: 0.3s;
  &:hover {
    color: #000;
    background-color: #ffffff54;
  }
}
.arrow.left {
  left: 0;
}
.arrow.right {
  right: 0;
}
</style>
