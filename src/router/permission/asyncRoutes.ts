import { RouteComponent, Router, RouteRecordNormalized } from 'vue-router'
import { BasicLayout } from '@/layout'
import { usePermissionStore } from '@/store'
import { ascending } from '@/utils/route'

const modulesRoutes = import.meta.glob('/src/views/*/*.vue')

function getAsyncRoutes(date: object): Promise<any> {
	return new Promise((resolve, reject) => {
		resolve({ info: [] })
	})
}

// 过滤后端传来的动态路由 重新生成规范路由
export const addAsyncRoutes = (arrRoutes: Array<RouteComponent>) => {
	if (!arrRoutes || !arrRoutes.length) return
	arrRoutes.forEach((v: any) => {
		if (v.redirect) {
			v.component = BasicLayout
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
				usePermissionStore().cacheOperate({ mode: 'add', name: v.name })
			})
			break
		case 'delete':
			usePermissionStore().cacheOperate({
				mode: 'delete',
				name: matched[matched.length - 1].name,
			})
			break
		default:
			usePermissionStore().cacheOperate({
				mode: 'delete',
				name: matched[matched.length - 1].name,
			})

			setTimeout(() => {
				matched.forEach(v => {
					usePermissionStore().cacheOperate({ mode: 'add', name: v.name })
				})
			}, 100)
	}
}
export function initRouter(name: string, router: Router) {
	return new Promise(resolve => {
		// 从后端获取用户路由
		getAsyncRoutes({ name }).then(({ info }) => {
			if (info.length === 0) {
				usePermissionStore().changeSetting(info)
			} else {
				// 过滤后端传来的动态路由 重新生成规范路由
				addAsyncRoutes(info).map((v: any) => {
					// 获取全部路由列表
					const routes = router.options.routes
					// 查看路由路由列表是否有该路由，防止重复添加路由
					const isExist = routes.findIndex(value => value.path === v.path)

					if (isExist !== -1) return
					else {
						// 切记将路由push到routes后还需要使用addRoute，这样路由才能正常跳转
						router.options.routes.push(v)
						// 最终路由进行升序
						ascending(router.options.routes)
						// 添加路由
						router.addRoute(v.name, v)
						usePermissionStore().changeSetting(info)
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
