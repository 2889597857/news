import Layout from '@/layout/index.vue'

const routes = {
	path: '/c',
	name: 'PageC',
	component: Layout,
	meta: {
		icon: 'Link',
		title: 'message.externalLink',
		showLink: true,
		i18n: true,
		rank: 190,
	},
	children: [
		{
			path: 'https://github.com/xiaoxian521/vue-pure-admin',
			meta: {
				title: 'message.externalLink',
				showLink: true,
				i18n: true,
				rank: 191,
			},
		},
	],
}

export default routes
