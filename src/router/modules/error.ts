import { BasicLayout } from '@/layout'

const errorRouter = {
	path: '/error',
	name: 'error',
	component: BasicLayout,
	redirect: '/error/401',
	meta: {
		keepAlive: false,
		showLink: false,
	},
	children: [
		{
			path: '/error/401',
			name: '401',
			component: () => import('@/views/error/401.vue'),
			meta: {
				title: '401',
				keepAlive: true,
				showLink: false,
			},
		},
		{
			path: '/error/404',
			name: '404',
			component: () => import('@/views/error/404.vue'),
			meta: {
				title: '404',
				keepAlive: true,
				showLink: false,
			},
		},
	],
}

export default errorRouter
