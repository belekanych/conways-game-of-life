<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'

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

function draw(e: MouseEvent, row: number, col: number) {
  if (e.which) {
    map.value[row][col] = true
  }
}

const map: Ref<boolean[][]> = ref(init(80, 200))

const playing: Ref<boolean> = ref(false)

const speed: Ref<number> = ref(1)

watch(speed, () => {
  if (playing.value) {
    clearInterval(tick)
  }

  handleTick()
})
</script>

<template>
  <div>
    <table>
      <tr
        v-for="(row, rowIndex) in map"
        :key="rowIndex"
      >
        <td
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="cell"
          :class="{ 'cell-alive': cell }"
          @click.prevent="toggleCell(rowIndex, colIndex)"
          @mousemove="draw($event, rowIndex, colIndex)"
        ></td>
      </tr>
    </table>
    <button type="button" @click.prevent="play">
      {{ playing ? 'Pause' : 'Play' }}
    </button>
    <button type="button" @click.prevent="nextStep">
      Next step
    </button>
    <label>
      Speed
      <input type="number" step="1" min="1" max="100" v-model="speed" />
    </label>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

table {
  border-spacing: 0;
  border: 1px solid #eee;
}

.cell {
  background-color: white;
  border: 1px solid #eee;
  height: 5px;
  width: 5px;
}

.cell-alive {
  background-color: #555;
}
</style>
