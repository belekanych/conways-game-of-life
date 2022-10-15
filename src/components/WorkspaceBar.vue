<script setup lang="ts">
import { useDarkMode } from '../store/darkMode'
import Btn from './Btn.vue'

// Store
const darkMode = useDarkMode()

// Methods
function toggle() {
  darkMode.toggleDark()
}
</script>

<template>
  <div>
    <btn
      :icon="darkMode.isDark ? 'moon' : 'sun'"
      @click="toggle"
    />
  </div>
</template>
