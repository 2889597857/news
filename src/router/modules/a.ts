import Layout from '@/layout/index.vue'

const routes = {
	path: '/a',
	name: 'PageA',
	component: Layout,
	redirect: '/a/index',
	meta: {
		keepAlive: true,
		showLink: true,
	},
	children: [
		{
			path: '/a/index',
			name: 'PageA',
			component: () => import('@/components/a/index.vue'),
			meta: {
				keepAlive: true,
				showLink: true,
			},
		},
	],
}

export default routes
