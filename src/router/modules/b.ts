import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = {
	path: '/b',
	name: 'PageB1',
	component: Layout,
	redirect: '/b/index',
	meta: {
		keepAlive: true,
		showLink: true,
	},
	children: [
		{
			path: '/b/index',
			name: 'PageB1',
			component: () => import('@/components/b/index.vue'),
			meta: {
				keepAlive: true,
				showLink: true,
			},
		},
		{
			path: '/b/index',
			name: 'PageB2',
			component: () => import('@/components/b/b2.vue'),
			meta: {
				keepAlive: true,
				showLink: true,
			},
		},
	],
}

export default routes
