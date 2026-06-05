<template>
  <p :class="['button-content', icon?.side ? `side--${icon.side}` : 'side--center']"> 
    <span v-if="label" class="button-content__label">{{ label }}</span>
    <h-icon v-if="icon" :icon="icon.hugeicons" />
  </p>
</template>

<script setup lang='ts'>
import type { iconProps } from '~/types/type/icon';

defineProps({
  icon: { type: Object as PropType<iconProps>, default: null },
  label: { type: String, default: '' },
})
</script>

<style lang='scss' scoped>
  .button-content{
    display: flex;
    white-space: nowrap;
    gap: 6px;
    &.side{
      &--top{
        flex-direction: column-reverse;
        align-items: center;
      }
      &--bottom{
        flex-direction: column;
        align-items: center;
      }
      &--left{
        flex-direction: row-reverse;
      }
      &--right{
        flex-direction: row;
      }
    }
    &__label{
      font-size: 14px;
      text-transform: capitalize;
    }
  }
</style>