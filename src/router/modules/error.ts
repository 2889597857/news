import { BasicLayout } from '@/layout';

const errorRouter = {
  path: '/error',
  name: 'error',
  component: BasicLayout,
  redirect: '/error/401',
  meta: {
    keepAlive: false,
    isNotMenu: false
  },
  children: [
    {
      path: '/error/401',
      name: '401',
      component: () => import('@/views/error/err401.vue'),
      meta: {
        title: '401',
        keepAlive: true,
        isNotMenu: false
      }
    },
    {
      path: '/error/404',
      name: '404',
      component: () => import('@/views/error/error404.vue'),
      meta: {
        title: '404',
        keepAlive: true,
        isNotMenu: false
      }
    }
  ]
};

export default errorRouter;
