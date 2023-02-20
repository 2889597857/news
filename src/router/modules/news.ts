import { BasicLayout } from '@/layout';

const newsRouter = {
  path: '/news',
  name: 'news',
  component: BasicLayout,
  redirect: '/news/list',
  meta: {
    icon: 'material-symbols:newspaper',
    title: '信息管理'
  },
  children: [
    {
      path: '/news/list',
      name: 'newsLists',
      component: () => import('@/views/news/index.vue'),
      meta: {
        title: '新闻列表',
        icon: 'mdi:newspaper-variant-multiple-outline'
      }
    },

    {
      path: '/news/site',
      name: 'newsSite',
      component: () => import('@/views/reportNews/index.vue'),
      meta: {
        title: '今日报送',
        icon: 'icon-park-outline:workbench'
      }
    }
  ]
};

export default newsRouter;
