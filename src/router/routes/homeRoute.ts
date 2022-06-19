import { BasicLayout } from '@/layout'

const homeRouter = {
	path: '/',
	name: 'home',
	component: BasicLayout,
	redirect: '/welcome',
	meta: {
		icon: 'HomeFilled',
		showLink: true,
		rank: 0,
	},
	children: [
		{
			path: '/welcome',
			name: 'welcome',
			component: () => import('@/views/news/index.vue'),
			meta: {
				title: 'message.hshome',
				showLink: true,
			},
		},
	],
}

export default homeRouter
