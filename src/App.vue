<script setup lang="ts">
import Toolbar from './components/Toolbar.vue'
import WorkspaceBar from './components/WorkspaceBar.vue'
import Screen from './components/Screen.vue'
import Heading from './components/Heading.vue'
import ScreenControls from './components/ScreenControls.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-slate-100 min-h-screen dark:bg-slate-900 transition">
    <heading />
    <div class="flex m-4">
      <toolbar />
      <screen />
      <workspace-bar />
    </div>
    <screen-controls />
  </div>
</template>
