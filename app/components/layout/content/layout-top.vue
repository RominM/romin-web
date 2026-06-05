<template>
  <div class="layout-top">
    <glass-bento class='layout-top__center'>
        <navbar />
    </glass-bento>
    <glass-bento>
      <theme-module />
    </glass-bento>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.layout-top {
  display: flex;
  align-items: center;
  position: relative;
  height: 80px;
  &__center {
    margin: 0 auto;
  }
}
</style>