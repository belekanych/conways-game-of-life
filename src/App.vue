<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

function init(height: number, width: number): boolean[][] {
  const map: boolean[][] = []

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    const row: boolean[] = []
    for (let colIndex = 0; colIndex < width; colIndex++) {
      row.push(false)
    }
    map.push(row)
  }

  return map
}

function getNextState(matrix: boolean[][]): boolean[][] {
  return matrix.map((vector: boolean[], row: number): boolean[] => {
    return vector.map((cell: boolean, col: number): boolean => {
      const neighbours = countNeighbours(matrix, row, col)

      // Any live cell with two or three live neighbours survives
      if (cell && (neighbours === 2 || neighbours === 3)) {
        return true
      }

      // Any dead cell with three live neighbours becomes a live cell
      if (!cell && neighbours === 3) {
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

const map: Ref<boolean[][]> = ref(init(4, 4))

const ui = computed<string[]>(() => {
  return map.value.map(row => {
    return row.map(cell => cell ? '1' : '0').join(' ')
  })
})
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
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
</style>
