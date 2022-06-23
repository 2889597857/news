import { BasicLayout } from '@/layout';

const homeRouter = {
  path: '/',
  name: 'home',
  component: BasicLayout,
  redirect: '/welcome',
  meta: {
    icon: 'icon-park-outline:workbench',
    showLink: true,
    title: 'welcome',
    rank: 0
  },
  children: [
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/index.vue'),
      meta: {
        title: '首页',
        showLink: true,
        icon: 'icon-park-outline:workbench'
      }
    }
  ]
};

export default homeRouter;
