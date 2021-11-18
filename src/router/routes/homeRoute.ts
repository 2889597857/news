import Layout from '@/layout/index.vue'

const homeRouter = {
	path: '/',
	name: 'home',
	component: Layout,
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
			component: () => import('@/views/index.vue'),
			meta: {
				title: 'message.hshome',
				showLink: true,
			},
		},
	],
}

export default homeRouter
