import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'

/** 路由描述 */
interface RouteMeta {
	/** 路由名称 */
	title?: string
	/** 缓存页面 */
	keepAlive?: boolean
	/** 页面100%视高 */
	fullPage?: boolean
	/** 不作为菜单 */
	isNotMenu?: boolean
	/** 菜单和面包屑对应的图标 */
	icon?: string
	/** 路由作为菜单时的排序 */
	order?: number
}

/** 路由配置 */
export type CustomRoute = RouteRecordRaw & { meta: RouteMeta }

/** 菜单项配置 */
export type GlobalMenuOption = MenuOption & {
	routeName: string
	routePath: string
}

/** npm依赖包版本信息 */
export interface VersionInfo {
	name: string
	version: string
}
