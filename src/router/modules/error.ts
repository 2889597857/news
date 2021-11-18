import Layout from '@/layout/index.vue'

const routes = {
	path: '/error',
	name: 'error',
	component: Layout,
	redirect: '/error/401',
	meta: {
		keepAlive: false,
		showLink: false,
	},
	children: [
		{
			path: '/error/401',
			name: '401',
			component: () => import('@/components/a/PageA.vue'),
			meta: {
				title: 'message.a1',
				keepAlive: true,
				showLink: false,
			},
		},
		{
			path: '/a/a-2',
			name: '404',
			component: () => import('@/components/a/PageA2.vue'),
			meta: {
				title: 'message.a2',
				keepAlive: true,
				showLink: false,
			},
		},
	],
}

export default routes
