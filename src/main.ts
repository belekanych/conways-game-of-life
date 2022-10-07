import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { register } from './vendor/font-awesome'

const app = createApp(App)

register(app)

app.mount('#app')
