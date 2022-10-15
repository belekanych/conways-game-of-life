import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

export const useDarkMode = defineStore('darkMode', {
  /**
   * Store state.
   */
  state: () => {
    return {
      isDark,
    }
  },

  /**
   * Store actions.
   */
  actions: {
    toggleDark,
  },
})