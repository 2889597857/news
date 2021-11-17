import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'

import './styles/index.scss'

const app = createApp(App)
console.log(router)
setupStore(app)
app.use(router)
app.mount('#app')
