import { createApp } from 'vue'
import TagSidebar from './components/TagSidebar.vue'

const app = createApp(TagSidebar)
const container = document.createElement('div')
container.id = 'tag-collector-app'
document.body.appendChild(container)
app.mount(container)