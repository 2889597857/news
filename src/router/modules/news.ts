import { BasicLayout } from '@/layout';

const newsRouter = {
  path: '/information',
  name: 'information',
  component: BasicLayout,
  redirect: '/information/news',
  meta: {
    icon: 'material-symbols:newspaper',
    title: '信息管理'
  },
  children: [
    {
      path: '/information/news',
      name: 'informationNews',
      component: () => import('@/views/information/news/index.vue'),
      meta: {
        title: '新闻列表',
        icon: 'mdi:newspaper-variant-multiple-outline'
      }
    },
    {
      path: '/information/report',
      name: 'informationReport',
      component: () => import('@/views/information/report/index.vue'),
      meta: {
        title: '今日报送',
        icon: 'icon-park-outline:workbench'
      }
    }
  ]
};

export default newsRouter;
