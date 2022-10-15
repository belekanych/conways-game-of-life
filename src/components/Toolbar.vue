<script setup lang="ts">
import { useMapStore } from '../store/map'
import Btn from './Btn.vue'

// Store
const mapStore = useMapStore()
</script>

<template>
  <div class="flex flex-col">
    <btn
      :class="['mb-2', mapStore.isPencilMode && 'shadow-xl scale-110 text-blue-700 dark:text-blue-300']"
      icon="pencil"
      @click="mapStore.selectPencil"
    />
    <btn
      :class="['mb-2', mapStore.isEraserMode && 'shadow-xl scale-110 text-blue-700 dark:text-blue-300']"
      icon="eraser"
      @click="mapStore.selectEraser"
    />
    <btn
      icon="shuffle"
      @click="mapStore.shuffle"
    />
    <btn
      icon="trash"
      @click="mapStore.clear"
    />
  </div>
</template>
