<script setup lang="ts">
import { ref, watch, onMounted, watchEffect, provide } from 'vue'
import type { Ref } from 'vue'
import SpeedControl from './components/SpeedControl.vue'
import Toolbar from './components/Toolbar.vue'
import WorkspaceBar from './components/WorkspaceBar.vue'
import { useDark } from '@vueuse/core'
import Btn from './components/Btn.vue'
import Screen from './components/Screen.vue'
import Heading from './components/Heading.vue'

function init(height: number, width: number): boolean[][] {
  const matrix: boolean[][] = []

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    const row: boolean[] = []
    for (let colIndex = 0; colIndex < width; colIndex++) {
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

function draw(row: number, col: number) {
  map.value[row][col] = drawMode.value
}

function random() {
  map.value = map.value.map(row => {
    return row.map(() => Math.random() < 0.3)
  })
}

function clear() {
  map.value = map.value.map(row => {
    return row.map(() => false)
  })
}

const map: Ref<boolean[][]> = ref(init(80, 200))

const playing: Ref<boolean> = ref(false)

const speed: Ref<number> = ref(4)

const drawMode = ref<boolean>(true)
  
const isDark = useDark()

watch(speed, () => {
  if (playing.value) {
    clearInterval(tick)
  }

  handleTick()
})

provide('isDark', isDark)
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-slate-100 min-h-screen dark:bg-slate-900 transition">
    <heading />
    <div class="flex m-4">
      <toolbar
        v-model="drawMode"
        @random="random"
        @clear="clear"
      />
      <screen
        :map="map"
        :color="isDark ? 'white' : 'black'"
        @draw="draw"
      />
      <workspace-bar />
    </div>
    <div class="flex">
      <speed-control v-model="speed" />
      <btn
        :icon="playing ? 'pause' : 'play'"
        class="mx-2"
        @click="play"
      />
      <btn
        icon="angle-right"
        @click="nextStep"
      />
    </div>
  </div>
</template>
