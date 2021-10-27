import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import { create, NButton } from 'naive-ui'

import './styles/index.scss'

const naive = create({
	components: [NButton],
})

const app = createApp(App)

setupStore(app)
app.use(router)
app.use(naive)
app.mount('#app')
