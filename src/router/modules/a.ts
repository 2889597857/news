import { BasicLayout } from '@/layout'

const routes = {
	path: '/a',
	name: 'PageA',
	component: BasicLayout,
	redirect: '/a/index',
	meta: {
		title: 'message.a',
		keepAlive: false,
		showLink: true,
		rank: 23,
	},
	children: [
		{
			path: '/a/index',
			name: 'PageA1',
			component: () => import('@/components/a/pageA1.vue'),
			meta: {
				title: 'message.a1',
				keepAlive: false,
				showLink: true,
			},
		},
		{
			path: '/a/a-2',
			name: 'PageA2',
			component: () => import('@/components/a/PageA2.vue'),
			meta: {
				title: 'message.a2',
				keepAlive: true,
				showLink: true,
			},
		},
	],
}

export default routes
