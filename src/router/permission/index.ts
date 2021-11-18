import { usePermissionStore } from '@/store'
import NProgress from '@/utils/progress'
import { storageLocal } from '@/utils/storage/storage'
import type { Router } from 'vue-router'
import { handleAliveRoute, initRouter } from './asyncRoutes'
import { uniqBy } from 'lodash-es'
const whiteList = []

export const createRouterGuide = (router: Router) => {
	router.beforeEach((to, from, next) => {
		NProgress.start()
		if (to.meta?.keepAlive) {
			const newMatched = to.matched
			handleAliveRoute(newMatched, 'add')
			// 页面整体刷新和点击标签页刷新
			if (from.name === undefined || from.name === 'redirect') {
				handleAliveRoute(newMatched)
			}
		}
		const token = '是否登录'
		if (token) {
			// 页面刷新
			if (usePermissionStore().wholeRoutes.length === 0) {
				// 初始化路由
				initRouter('asd', router).then((router: Router) => {
					router.push(to.path)
					// 获取全部路由列表
					const optionsRoutes = router.options?.routes
					// 获取路由访问记录
					const localRoutes = storageLocal.getItem('responsive-routesInStorage')
					const newLocalRoutes = []
					optionsRoutes.forEach(ors => {
						localRoutes.forEach(lrs => {
							if (ors.path === lrs.parentPath) {
								newLocalRoutes.push(lrs)
							}
						})
					})
					storageLocal.setItem('responsive-routesInStorage', uniqBy(newLocalRoutes, 'path'))
				})
			}
			next()
		} else {
			if (to.path !== '/login') {
				if (whiteList.indexOf(to.path) !== -1) {
					next()
				} else {
					next({ path: '/login' })
				}
			} else {
				next()
			}
		}
	})
	router.afterEach(() => {
		NProgress.done()
	})
}
