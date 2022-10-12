<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'

const CELL_SIZE: number = 6
const CELL_BORDER: number = 1

const canvas = ref<HTMLCanvasElement | null>(null)

const props = defineProps<{
  map: boolean[][],
  color: string,
}>()

const emit = defineEmits<{
  (e: 'draw', row: number, col: number): void
}>()

watchEffect(() => {
  const ctx = canvas.value?.getContext('2d')

  if (!canvas.value || !ctx) {
    return
  }

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  props.map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const x = colIndex * CELL_SIZE
      const y = rowIndex * CELL_SIZE

      if (!cell) {
        return
      }

      ctx.fillStyle = props.color
      ctx.fillRect(x + CELL_BORDER, y + CELL_BORDER, CELL_SIZE - CELL_BORDER * 2, CELL_SIZE - CELL_BORDER * 2)
    })
  })
})

onMounted(() => {
  if (!canvas.value) {
    return
  }

  canvas.value.height = props.map.length * CELL_SIZE
  canvas.value.width = props.map[0].length * CELL_SIZE
})

function onMouseMove(e: MouseEvent) {
  if (e.buttons && !e.button) {
    const col = Math.floor(e.offsetX / CELL_SIZE)
    const row = Math.floor(e.offsetY / CELL_SIZE)

    emit('draw', row, col)
  }
}
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-1 w-min mx-4 dark:bg-slate-800">
    <canvas ref="canvas" @mousemove="onMouseMove">
      Canvas is not supported in your browser
    </canvas>
  </div>
</template>
