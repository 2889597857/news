import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'

import './styles/index.scss'

const app = createApp(App)

// pinia 状态管理
setupStore(app)
// vue-router 路由
app.use(router)
app.mount('#app')
