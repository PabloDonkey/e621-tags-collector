import { createApp } from 'vue'
import App from './app.vue'

const app = createApp(App)
const container = document.createElement('div')
container.id = 'tag-collector-app'
document.body.appendChild(container)
app.mount(container)