import Layout from '@/layout/index.vue'

const routes = {
	path: '/b',
	name: 'PageB',
	component: Layout,
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
