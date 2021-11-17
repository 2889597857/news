import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/a',
		name: 'PageA',
		component: Layout,
		redirect: '/a/index',
		children: [
			{
				path: '/a/index',
				name: 'PageA',
				component: () => import('@/components/a/index.vue'),
			},
		],
	},
]
export default routes
