import { BasicLayout } from '@/layout';

const homeRouter = {
  path: '/',
  name: 'home',
  component: BasicLayout,
  redirect: '/home',
  meta: {
    icon: 'icon-park-outline:workbench',
    showLink: true,
    title: '首页',
    rank: 0
  },
  children: [
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页',
        showLink: true,
        icon: 'icon-park-outline:workbench'
      }
    }
  ]
};

export default homeRouter;
