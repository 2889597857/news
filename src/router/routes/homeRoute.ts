import { BasicLayout } from '@/layout';

const homeRouter = {
  path: '/',
  name: 'home',
  component: BasicLayout,
  redirect: '/home/welcome',
  meta: {
    icon: 'icon-park-outline:workbench',
    showLink: true,
    title: '首页',
    rank: 0
  },
  children: [
    {
      name: 'welcome',
      path: '/home/welcome',
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
