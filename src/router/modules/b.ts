import { BasicLayout } from '@/layout'

const routes = {
	path: '/b',
	name: 'PageB',
	component: BasicLayout,
	redirect: '/b/index',
	meta: {
		title: 'message.b',
		keepAlive: true,
		showLink: true,
		rank: 0,
	},
	children: [
		{
			path: '/b/index',
			name: 'PageB',
			component: () => import('@/components/b/index.vue'),
			meta: {
				title: 'message.b-1',
				keepAlive: true,
				showLink: true,
			},
		},
	],
}

export default routes
