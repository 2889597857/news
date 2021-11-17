import Layout from '@/layout/index.vue'

const routes = {
	path: '/b',
	name: 'PageB',
	component: Layout,
	redirect: '/b/b1',
	meta: {
		keepAlive: true,
		showLink: true,
	},
	children: [
		{
			path: '/b/b1',
			name: 'PageB1',
			component: () => import('@/components/b/index.vue'),
			meta: {
				keepAlive: true,
				showLink: true,
			},
		},
		{
			path: '/b/b2',
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
