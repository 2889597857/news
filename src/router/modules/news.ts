import { BasicLayout } from '@/layout';

const newsRouter = {
  path: '/news',
  name: 'news',
  component: BasicLayout,
  redirect: '/news/list',
  meta: {
    icon: 'icon-park-outline:analysis',
    title: '信息报送'
  },
  children: [
    {
      path: '/news/list',
      name: 'newsLists',
      component: () => import('@/views/news/index.vue'),
      meta: {
        title: '新闻列表',
        icon: 'icon-park-outline:workbench'
      }
    },

    {
      path: '/news/site',
      name: 'newsSite',
      component: () => import('@/views/newsSite/index.vue'),
      meta: {
        title: '新闻站点',
        icon: 'icon-park-outline:workbench'
      }
    },
    {
      path: '/news/details',
      name: 'newsDetails',
      component: () => import('@/views/newsDetails/index.vue'),
      meta: {
        title: '新闻详情',
        icon: 'icon-park-outline:workbench'
      }
    }
  ]
};

export default newsRouter;
