import { BasicLayout } from '@/layout';

const taskRouter = {
  path: '/management',
  name: 'management',
  component: BasicLayout,
  redirect: '/management/list',
  meta: {
    icon: 'carbon:task-approved',
    title: '系统管理'
  },
  children: [
    {
      path: '/management/list',
      name: 'user',
      component: () => import('@/views/management/user/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'fluent:task-list-add-20-filled'
      }
    },

    {
      path: '/management/site',
      name: 'permission',
      component: () => import('@/views/management/permission/index.vue'),
      meta: {
        title: '权限管理',
        icon: 'ic:baseline-add-task'
      }
    }
  ]
};

export default taskRouter;
