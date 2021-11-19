import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import { injectResponsiveStorage } from './utils/storage/responsive'

const app = createApp(App)

async function setupApp() {
	// 响应式 localStorage
	injectResponsiveStorage(app)
	// pinia 状态管理
	setupStore(app)
	// vue-router 路由
	await setupRouter(app)
	// ui 组件库
	app.use(ElementPlus)
	app.mount('#app')
}
setupApp()
