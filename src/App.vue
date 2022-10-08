<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref, computed, watch, onMounted, watchEffect } from 'vue'
import type { Ref } from 'vue'
import SpeedControl from './components/SpeedControl.vue'

const cellSize: number = 6
const cellBorder: number = 1

function init(height: number, width: number): boolean[][] {
  const matrix: boolean[][] = []

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    const row: boolean[] = []
    for (let colIndex = 0; colIndex < width; colIndex++) {
      // row.push(Math.random() < 0.3)
      row.push(false)
    }
    matrix.push(row)
  }

  return matrix
}

function getNextState(matrix: boolean[][]): boolean[][] {
  return matrix.map((vector: boolean[], row: number): boolean[] => {
    return vector.map((cell: boolean, col: number): boolean => {
      const neighbours = countNeighbours(matrix, row, col)
      const isAlive = cell

      // Any live cell with two or three live neighbours survives
      if (isAlive && (neighbours === 2 || neighbours === 3)) {
        return true
      }

      // Any dead cell with three live neighbours becomes a live cell
      if (!isAlive && neighbours === 3) {
        return true
      }

      // All other live cells die in the next generation. Similarly, all other dead cells stay dead
      return false
    })
  })
}

function countNeighbours(matrix: boolean[][], row: number, col: number): number {
  const height = matrix.length
  const width = height ? matrix[0].length : 0

  let neighbours: number = 0

  // X00
  // 0 0
  // 000
  if (row > 0 && col > 0 && matrix[row - 1][col - 1]) {
    neighbours++
  }

  // 0X0
  // 0 0
  // 000
  if (row > 0 && matrix[row - 1][col]) {
    neighbours++
  }

  // 00X
  // 0 0
  // 000
  if (row > 0 && col < width - 1 && matrix[row - 1][col + 1]) {
    neighbours++
  }

  // 000
  // X 0
  // 000
  if (col > 0 && matrix[row][col - 1]) {
    neighbours++
  }
  
  // 000
  // 0 X
  // 000
  if (col < width - 1 && matrix[row][col + 1]) {
    neighbours++
  }

  // 000
  // 0 0
  // X00
  if (row < height - 1 && col > 0 && matrix[row + 1][col - 1]) {
    neighbours++
  }

  // 000
  // 0 0
  // 0X0
  if (row < height - 1 && matrix[row + 1][col]) {
    neighbours++
  }

  // 000
  // 0 0
  // 00X
  if (row < height - 1 && col < width - 1 && matrix[row + 1][col + 1]) {
    neighbours++
  }

  return neighbours
}

function nextStep() {
  map.value = getNextState(map.value)
}

function toggleCell(row: number, col: number) {
  map.value[row][col] = !map.value[row][col]
}

function play() {
  playing.value = !playing.value

  handleTick()
}

function handleTick() {
  if (playing.value) {
    tick = createTick()
  } else {
    clearInterval(tick)
  }
}

let tick: number

function createTick() {
   return setInterval(() => {
    if (playing.value) {
      nextStep()
    }
  }, 1000 / speed.value)
}

function draw(e: MouseEvent) {
  if (e.buttons && !e.button) {
    const col = Math.floor(e.offsetX / cellSize)
    const row = Math.floor(e.offsetY / cellSize)

    map.value[row][col] = true
  }
}

const map: Ref<boolean[][]> = ref(init(80, 200))

const playing: Ref<boolean> = ref(false)

const speed: Ref<number> = ref(4)

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvas.value) {
    return
  }

  canvas.value.height = map.value.length * cellSize
  canvas.value.width = map.value[0].length * cellSize
})

watch(speed, () => {
  if (playing.value) {
    clearInterval(tick)
  }

  handleTick()
})

watchEffect(() => {
  const ctx = canvas.value?.getContext('2d')

  if (!canvas.value || !ctx) {
    return
  }

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  map.value.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const x = colIndex * cellSize
      const y = rowIndex * cellSize

      if (!cell) {
        return
      }

      ctx.fillStyle = 'black'
      ctx.fillRect(x + cellBorder, y + cellBorder, cellSize - cellBorder * 2, cellSize - cellBorder * 2)
    })
  })
})
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-slate-50 min-h-screen">
    <h1 class="text-gray-900 font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-center dark:text-white mb-2">
      Conway's Game of Life
      <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" class="cursor-alias hover:text-blue-600">
        <font-awesome-icon icon="circle-info" class="text-3xl"/>
      </a>
    </h1>
    <div class="bg-white shadow-lg rounded-lg p-1 w-min m-4">
      <canvas ref="canvas" @mousemove="draw">
        Canvas is not supported in your browser
      </canvas>
    </div>
    <div class="flex">
      <speed-control v-model="speed" />
      <button
        type="button"
        class="pointer-events-auto rounded-lg shadow-lg bg-white py-2 px-4 text-center font-medium active:scale-90 active:shadow-md transition w-12 mx-2"
        @click.prevent="play"
      >
        <font-awesome-icon :icon="['fa-solid', playing ? 'fa-pause' : 'fa-play']" />
      </button>
      <button
        type="button"
        class="pointer-events-auto rounded-lg shadow-lg bg-white py-2 px-4 text-center font-medium active:scale-90 active:shadow-md transition w-12"
        @click.prevent="nextStep"
      >
        <font-awesome-icon icon="fa-solid fa-angle-right" />
      </button>
    </div>
  </div>
</template>
