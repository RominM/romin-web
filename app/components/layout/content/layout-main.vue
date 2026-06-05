<template>
  <div class="layout-main">
    <div class='layout-main__left'>
      <glass-bento class='layout-main__left__top'>
        personal-sheet
      </glass-bento>
      <glass-bento class='layout-main__left__bottom'>
        network
      </glass-bento>
    </div>
    <glass-bento class='layout-main__constent-page'>
      <slot />
    </glass-bento>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.layout-main {
  display: flex;
  gap: 80px;
  height: calc(100dvh - 160px);
  &__left {
    display: flex;
    flex-direction: column;
    gap: 80px;
    flex: 0 0 20%; 
    &__top {
      flex: 7; 
    }
    &__bottom {
      flex: 3; 
    }
  }
  &__content-page {
    flex: 0 0 80%; 
  }
}
</style>