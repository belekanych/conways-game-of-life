import { createPinia } from 'pinia'
import { App } from 'vue'

export function usePinia(app: App): void {
  app.use(createPinia())
}