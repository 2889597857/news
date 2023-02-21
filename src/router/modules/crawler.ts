import { BasicLayout } from '@/layout';

const crawlerRouter = {
  path: '/crawler',
  name: 'crawler',
  component: BasicLayout,
  redirect: '/crawler/site',
  meta: {
    icon: 'icon-park-outline:analysis',
    title: '爬虫管理'
  },
  children: [
    {
      path: '/crawler/site',
      name: 'crawlerSite',
      component: () => import('@/views/crawler/website/index.vue'),
      meta: {
        title: '站点管理',
        icon: 'icon-park-outline:workbench'
      }
    },
    {
      path: '/crawler/task',
      name: 'crawlerTask',
      component: () => import('@/views/crawler/task/index.vue'),
      meta: {
        title: '任务管理',
        icon: 'cil:history'
      }
    }
  ]
};

export default crawlerRouter;
