import { BasicLayout } from '@/layout';

const reportRouter = {
  path: '/report',
  name: 'report',
  component: BasicLayout,
  redirect: '/report/list',
  meta: {
    icon: 'icon-park-outline:analysis',
    title: '报送'
  },
  children: [
    {
      path: '/report/list',
      name: 'reportLists',
      component: () => import('@/views/reportNews/index.vue'),
      meta: {
        title: '今日报送',
        icon: 'icon-park-outline:workbench'
      }
    },

    {
      path: '/report/history',
      name: 'reportHistory',
      component: () => import('@/views/reportHistory/index.vue'),
      meta: {
        title: '历史报送',
        icon: 'cil:history'
      }
    }
  ]
};

export default reportRouter;
