<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { inject, WritableComputedRef } from 'vue';
import Btn from './Btn.vue'

const isDark = inject<WritableComputedRef<boolean>>('isDark')
  
const toggleDark = useToggle(isDark)
</script>

<template>
  <div>
    <btn
      :icon="isDark ? 'moon' : 'sun'"
      @click="toggleDark()"
    />
  </div>
</template>
