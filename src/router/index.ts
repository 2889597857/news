import { createRouter, createWebHistory, Router, RouteComponent } from 'vue-router'
import { routes } from './modules/routes'
import NProgress from '@/utils/progress'
import a from './modules/a'
import b from './modules/b'

const constantRoutes: Array<RouteComponent> = [a, b]

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
