<template>
  <div class="glass-bento">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.glass-bento {
background: rgba(255, 255, 255, 0.11);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(6.3px);
border: 1px solid rgba(255, 255, 255, 0.12);
}
</style>