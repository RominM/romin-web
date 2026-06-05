<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="modal" @click="close">
      <transition name="dialog-zoom">
        <div 
          v-if="isOpen" 
          class="modal__dialog"
          :style="{ minWidth: minWidth, maxWidth: maxWidth }"
          @click.stop
        >
          <div class="modal__dialog--header">
            <h4>{{ title }}</h4>
            <h-icon 
              v-if="dismisable && showCross" 
              class="modal__dialog--header--cross" 
              :icon="MultiplicationSignIcon"
              @click="close"  
            />
          </div>
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { MultiplicationSignIcon } from '@hugeicons/core-free-icons'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  showCross: { type: Boolean, default: false },
  dismisable: { type: Boolean, default: false },
  title: { type: String, default: '' },
  minWidth: { type: String, default: '50px' },
  maxWidth: { type: String, default: '80%' }
})

const emit = defineEmits(['update:isOpen'])

function close() {
  if (!props.dismisable) return
  emit('update:isOpen', false)
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal__dialog {
  min-width: 50px;
  min-height: 50px;
  max-height: 45vw;
  padding: 10px;
  border-radius: 8px;
  background-color: $dark-surface;
  transform-origin: center;
  overflow: auto;
  &--header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    color: #fff;
    &--cross {
      margin-left: auto;
    }
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.dialog-zoom-enter-active,
.dialog-zoom-leave-active {
  transition: all 0.25s ease;
}
.dialog-zoom-enter-from,
.dialog-zoom-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>