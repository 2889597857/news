import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
		meta: {
			keepAlive: true,
		},
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('@/views/About.vue'),
	},
]
