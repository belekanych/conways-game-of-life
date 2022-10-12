<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { inject, WritableComputedRef } from 'vue';
import Btn from './Btn.vue'

const isDark = inject<WritableComputedRef<boolean>>('isDark')
  
const toggleDark = useToggle(isDark)

/**
 * Vue use has some issues with TypeScript.
 */
function toggle() {
  // @ts-ignore
  toggleDark()
}
</script>

<template>
  <div>
    <btn
      :icon="isDark ? 'moon' : 'sun'"
      @click="toggle"
    />
  </div>
</template>
