<script setup lang="ts">
import { CELL_BORDER, CELL_SIZE, CELL_FILL_DARK, CELL_FILL_LIGHT } from '../config/screen'
import { ref, onMounted, watchEffect } from 'vue'
import { useDarkMode } from '../store/darkMode'
import { useMapStore } from '../store/map'

// Store
const mapStore = useMapStore()
const darkMode = useDarkMode()

// Refs
const canvas = ref<HTMLCanvasElement | null>(null)

// Watchers
watchEffect(() => {
  const ctx = canvas.value?.getContext('2d')

  if (!canvas.value || !ctx) {
    return
  }

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  mapStore.map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const x = colIndex * CELL_SIZE
      const y = rowIndex * CELL_SIZE

      if (!cell) {
        return
      }

      ctx.fillStyle = darkMode.isDark ? CELL_FILL_LIGHT : CELL_FILL_DARK
      ctx.fillRect(x + CELL_BORDER, y + CELL_BORDER, CELL_SIZE - CELL_BORDER * 2, CELL_SIZE - CELL_BORDER * 2)
    })
  })
})

// Component's hooks
onMounted(() => {
  if (!canvas.value) {
    return
  }

  canvas.value.height = mapStore.map.length * CELL_SIZE
  canvas.value.width = mapStore.map[0].length * CELL_SIZE
})

// Methods
function onMouseMove(e: MouseEvent) {
  if (e.buttons && !e.button) {
    const col = Math.floor(e.offsetX / CELL_SIZE)
    const row = Math.floor(e.offsetY / CELL_SIZE)

    mapStore.draw(row, col)
  }
}
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-1 w-min mx-4 dark:bg-slate-800 transition">
    <canvas
      ref="canvas"
      @mousemove="onMouseMove"
    >
      Canvas is not supported in your browser
    </canvas>
  </div>
</template>
