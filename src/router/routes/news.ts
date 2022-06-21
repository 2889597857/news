import { BasicLayout } from '@/layout';

const newsRouter = {
  path: '/news',
  name: 'news',
  component: BasicLayout,
  redirect: '/news/list',
  meta: {
    icon: 'HomeFilled',
    showLink: true,
    rank: 0
  },
  children: [
    {
      path: '/news/list',
      name: 'welcome',
      component: () => import('@/views/news/index.vue'),
      meta: {
        title: '新闻列表'
      }
    },
    {
      path: '/news/iframe',
      name: 'iframe',
      component: () => import('@/views/iFrame/index.vue'),
      meta: {
        title: '新闻详情'
      }
    }
  ]
};

export default newsRouter;
