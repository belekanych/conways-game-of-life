import { defineStore } from 'pinia'
import { HEIGHT, WIDTH } from '../config/map'
import { RAND_SIZE, MODE_ERASER, MODE_PENCIL } from '../config/tools'

/**
 * Create an initial map.
 *
 * @param height Initial map height
 * @param width Initial map width
 * @returns Matrix of cells
 */
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

/**
 * Calculate next state for the map
 *
 * @param matrix Matrix of cells
 * @returns Next state of the passed matrix of cells
 */
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

/**
 * Returns amount of alive cells near the selected cell.
 *
 * @param matrix Matrix of cells
 * @param row Index of the cell's row
 * @param col Index of the cell's column
 * @returns Amount of alive neighbours
 */
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
  /**
   * Store state.
   *
   * @returns 
   */
  state: () => {
    return {
      /**
       * Matrix of cells.
       */
      map: init(HEIGHT, WIDTH),

      /**
       * Drawing modes (pencil or eraser).
       */
      drawMode: MODE_PENCIL,
    }
  },

  /**
   * Store getters.
   */
  getters: {
    /**
     * Returns true if the selected mode is pencil.
     *
     * @param state 
     * @returns 
     */
    isPencilMode(state) {
      return state.drawMode === MODE_PENCIL
    },

    /**
     * Returns true if the selected mode is eraser.
     *
     * @param state 
     * @returns 
     */
    isEraserMode(state) {
      return state.drawMode === MODE_ERASER
    },
  },

  /**
   * Store actions.
   */
  actions: {
    /**
     * Calculate the next step for the store's map.
     */
    nextStep() {
      this.map = getNextState(this.map)
    },

    /**
     * Select the pencil drawing mode.
     */
    selectPencil() {
      this.drawMode = MODE_PENCIL
    },

    /**
     * Select the eraser drawing mode.
     */
    selectEraser() {
      this.drawMode = MODE_ERASER
    },

    /**
     * Set the cell's state depending on the selected draw mode.
     *
     * @param row Index of the cell's row
     * @param col Index of the cell's col
     */
    draw(row: number, col: number) {
      this.map[row][col] = this.drawMode
    },

    /**
     * Generate a random map.
     */
    shuffle() {
      this.map = this.map.map(row => {
        return row.map(() => Math.random() < RAND_SIZE)
      })
    },

    /**
     * Remove all cells.
     */
    clear() {
      this.map = this.map.map(row => {
        return row.map(() => false)
      })
    },
  },
})