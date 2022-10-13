import { defineStore } from 'pinia'

const HEIGHT = 80
const WIDTH = 200
const RAND_SIZE = 0.3
const MODE_PENCIL = true
const MODE_ERASER = false

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

export const useMapStore = defineStore('map', {
  state: () => {
    return {
      map: init(HEIGHT, WIDTH),
      drawMode: MODE_PENCIL,
    }
  },

  getters: {
    isPencilMode(state) {
      return state.drawMode === MODE_PENCIL
    },

    isEraserMode(state) {
      return state.drawMode === MODE_ERASER
    },
  },

  actions: {
    nextStep() {
      this.map = getNextState(this.map)
    },

    selectPencil() {
      this.drawMode = MODE_PENCIL
    },

    selectEraser() {
      this.drawMode = MODE_ERASER
    },

    draw(row: number, col: number) {
      this.map[row][col] = this.drawMode
    },

    shuffle() {
      this.map = this.map.map(row => {
        return row.map(() => Math.random() < RAND_SIZE)
      })
    },

    clear() {
      this.map = this.map.map(row => {
        return row.map(() => false)
      })
    },
  },
})