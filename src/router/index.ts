import { createRouter, createWebHistory, Router } from 'vue-router'
import { routes } from './routes'
import NProgress from '@/utils/progress'

const router: Router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	NProgress.start()
	
	// ...
	// 返回 false 以取消导航
	// return false
	next()
})

router.afterEach(() => {
	NProgress.done()
})

export default router
