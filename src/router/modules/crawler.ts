import { BasicLayout } from '@/layout';

const reportRouter = {
  path: '/crawler',
  name: 'crawler',
  component: BasicLayout,
  redirect: '/crawler/list',
  meta: {
    icon: 'icon-park-outline:analysis',
    title: '爬虫管理'
  },
  children: [
    {
      path: '/crawler/list',
      name: 'crawlerLists',
      component: () => import('@/views/reportNews/index.vue'),
      meta: {
        title: '站点管理',
        icon: 'icon-park-outline:workbench'
      }
    },
    {
      path: '/crawler/history',
      name: 'crawlerHistory',
      component: () => import('@/views/reportHistory/index.vue'),
      meta: {
        title: '任务管理',
        icon: 'cil:history'
      }
    }
  ]
};

export default reportRouter;
