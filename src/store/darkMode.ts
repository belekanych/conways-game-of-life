import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

export const useDarkMode = defineStore('darkMode', {
  state: () => {
    return {
      isDark,
    }
  },

  actions: {
    toggleDark,
  },
})