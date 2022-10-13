import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { register } from './vendor/font-awesome'
import { usePinia } from './vendor/pinia'

const app = createApp(App)

register(app)
usePinia(app)

app.mount('#app')
