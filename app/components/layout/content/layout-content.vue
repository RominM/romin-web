<template>
  <div class="layout-content">
    <layout-top />
    <layout-main>
      <slot />
    </layout-main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  gap: 80px;
  max-width: 1440px;
  height: calc(100dvh - 80px);
  margin: auto;
  color: #000;
}
</style>