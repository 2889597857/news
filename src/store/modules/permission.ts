import { defineStore } from 'pinia'
import { store } from '@/store'
import { ascending, filterTree, constantRoutesArr } from '@/router/index'

export const usePermissionStore = defineStore({
	id: 'permission',
	state: () => ({
		// 静态路由
		constantRoutes: constantRoutesArr,
		// 菜单栏展示的路由
		wholeRoutes: [],
		// 按钮权限
		buttonAuth: [],
		// 缓存页面keepAlive
		cachePageList: [],
	}),
	actions: {
		asyncActionRoutes(routes: any[]) {
			if (this.wholeRoutes.length > 0) return
			this.wholeRoutes = filterTree(ascending(this.constantRoutes.concat(routes)))

			const getButtonAuth = (arrRoutes: Array<string>) => {
				if (!arrRoutes || !arrRoutes.length) return
				arrRoutes.forEach((v: any) => {
					if (v.meta && v.meta.authority) {
						this.buttonAuth.push(...v.meta.authority)
					}
					if (v.children) {
						getButtonAuth(v.children)
					}
				})
			}

			getButtonAuth(this.wholeRoutes)
		},
		async changeSetting(router: any) {
			await this.asyncActionRoutes(router)
		},
	},
	getters: {},
})

export const usePermissionStoreHook = () => usePermissionStore(store)
