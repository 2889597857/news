import {
	createRouter,
	createWebHistory,
	Router,
	RouteComponent,
	RouteRecordNormalized,
} from 'vue-router'
import NProgress from '@/utils/progress'
import Layout from '@/layout/index.vue'
import a from './modules/a'
import b from './modules/b'
import c from './modules/c'
import remaining from './modules/remaining'
import { usePermissionStoreHook } from '@/store/modules/permission'

const modulesRoutes = import.meta.glob('/src/views/*/*/*.vue')

// 过滤meta中showLink为false的路由
export const filterTree = (data: any[]) => {
	const newTree = data.filter(v => v.meta.showLink)
	newTree.forEach(v => v.children && (v.children = filterTree(v.children)))
	return newTree
}
function getAsyncRoutes(date: object): Promise<any> {
	return new Promise((resolve, reject) => {
		resolve({ info: [] })
	})
}
// 按照路由中meta下的rank等级升序来排序路由
export const ascending = (arr: any) => {
	return arr.sort((a: any, b: any) => {
		return a?.meta?.rank - b?.meta?.rank
	})
}

// 静态路由
const constantRoutes: Array<RouteComponent> = [a, b]

export const constantRoutesArr = ascending(constantRoutes).concat(...remaining)
// 过滤后端传来的动态路由 重新生成规范路由
export const addAsyncRoutes = (arrRoutes: Array<RouteComponent>) => {
	if (!arrRoutes || !arrRoutes.length) return
	arrRoutes.forEach((v: any) => {
		if (v.redirect) {
			v.component = Layout
		} else {
			v.component = modulesRoutes[`/src/views${v.path}/index.vue`]
		}
		if (v.children) {
			addAsyncRoutes(v.children)
		}
	})
	return arrRoutes
}
// 处理缓存路由（添加、删除、刷新）
export const handleAliveRoute = (matched: RouteRecordNormalized[], mode?: string) => {
	switch (mode) {
		case 'add':
			matched.forEach(v => {
				usePermissionStoreHook().cacheOperate({ mode: 'add', name: v.name })
			})
			break
		case 'delete':
			usePermissionStoreHook().cacheOperate({
				mode: 'delete',
				name: matched[matched.length - 1].name,
			})
			break
		default:
			usePermissionStoreHook().cacheOperate({
				mode: 'delete',
				name: matched[matched.length - 1].name,
			})

			setTimeout(() => {
				matched.forEach(v => {
					usePermissionStoreHook().cacheOperate({ mode: 'add', name: v.name })
				})
			}, 100)
	}
}
export function initRouter(name: string) {
	return new Promise(resolve => {
		getAsyncRoutes({ name }).then(({ info }) => {
			if (info.length === 0) {
				usePermissionStoreHook().changeSetting(info)
			} else {
				addAsyncRoutes(info).map((v: any) => {
					// 防止重复添加路由
					if (router.options.routes.findIndex(value => value.path === v.path) !== -1) {
						return
					} else {
						// 切记将路由push到routes后还需要使用addRoute，这样路由才能正常跳转
						router.options.routes.push(v)
						// 最终路由进行升序
						ascending(router.options.routes)
						router.addRoute(v.name, v)
						usePermissionStoreHook().changeSetting(info)
					}
					resolve(router)
				})
			}
			router.addRoute({
				path: '/:pathMatch(.*)',
				redirect: '/error/404',
			})
		})
	})
}
const router: Router = createRouter({
	history: createWebHistory(),
	routes: filterTree(ascending(constantRoutes)).concat(...remaining),
})
initRouter('asd')
router.beforeEach((to, from, next) => {
	NProgress.start()
	if (to.meta?.keepAlive) {
		const newMatched = to.matched
		console.log(newMatched)
		handleAliveRoute(newMatched, 'add')
		// 页面整体刷新和点击标签页刷新
		if (from.name === undefined || from.name === 'redirect') {
			handleAliveRoute(newMatched)
		}
	}
	next()
})

router.afterEach(() => {
	NProgress.done()
})

export default router
