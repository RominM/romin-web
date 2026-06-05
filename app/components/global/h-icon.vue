<template>
    <HugeiconsIcon class='h-icon' :icon="icon"/>
</template>

<script setup lang='ts'>
import { HugeiconsIcon } from '@hugeicons/vue'
import type { IconSvgObject } from '~/types/type/icon';
defineProps({
  icon: { type: Object as PropType<IconSvgObject>, default: '' },
})
</script>

<style lang='scss' scoped>
    .h-icon{}
</style>