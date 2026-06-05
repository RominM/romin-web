<template>
  <nuxt-link v-if="link" :to="link" :class="['action-button', `type--${type}`, fill ? 'fill' : 'hug']">
    <button-content :label="label" :icon="icon"/>
  </nuxt-link>

  <button v-else :class="['action-button', `type--${type}`, fill ? 'fill' : 'hug']" @click="$emit('click')">
    <button-content :label="label" :icon="icon"/>
  </button>
</template>

<script setup lang='ts'>
import { ButtonType } from '~/types/enum/global/button';
import type { iconProps } from '~/types/type/icon';

defineProps({
  label: { type: String, default: '' },
  link: {type: String, default: null},
  icon: { type: Object as PropType<iconProps>, default: null },
  type: { type: Object as PropType<ButtonType>, default: ButtonType.PRIMARY },
  fill: { type: Boolean, default: false }
})
</script>

<style lang='scss' scoped>
.action-button {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .2s ease-in-out;
  &.fill {
    width: 100%;
  }
  &.hug {
    width: fit-content;
  }

  &.type {
    &--cta{
      @include baseButton();
      background-color: $success;
      border-color: $success;
      &:hover {
        background-color: $success-hover;
        border-color: $border;
      }
    }

    &--destructive {
      @include baseButton();
      background-color: $error-hover;
      border-color: $error-hover;
      &:hover {
        background-color: $error;
        border-color: $border;
      }
    }

    &--fab {
      min-width: none;
      padding: 17px;
      height: max-content;
      overflow: hidden;
      aspect-ratio: 1;
      border: solid 1px;
      border-radius: 50%;
      &:hover {
        transform: scale(1.03);
        color: $primary-hover;
      }
    }

    &--primary{
      @include baseButton();
      background-color: $primary;
      border-color: $primary-hover;
      &:hover{
        background-color: $primary-hover;
        border-color: $border;
      }
    }

    &--secondary{
      @include baseButton();
      &:hover{
        transform: translate(4px,-2px);
      }
    }

    &--tertiary{
      text-decoration: underline transparent;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>