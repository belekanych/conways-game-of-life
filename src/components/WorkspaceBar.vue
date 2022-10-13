<script setup lang="ts">
import Btn from './Btn.vue'
import { useDarkMode } from '../store/darkMode';

const darkMode = useDarkMode()

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
