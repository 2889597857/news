import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/b',
		name: 'PageB1',
		component: Layout,
		redirect: '/b/index',
		children: [
			{
				path: '/b/index',
				name: 'PageB1',
				component: () => import('@/components/b/index.vue'),
			},
			{
				path: '/b/index',
				name: 'PageB2',
				component: () => import('@/components/b/b2.vue'),
				meta: {
					keepAlive: true,
				},
			},
		],
	},
]
export default routes
