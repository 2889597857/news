import { BasicLayout } from '@/layout';

const taskRouter = {
  path: '/task',
  name: 'task',
  component: BasicLayout,
  redirect: '/task/list',
  meta: {
    icon: 'carbon:task-approved',
    title: '任务'
  },
  children: [
    {
      path: '/task/list',
      name: 'taskLists',
      component: () => import('@/views/task/index.vue'),
      meta: {
        title: '任务列表',
        icon: 'fluent:task-list-add-20-filled'
      }
    },

    {
      path: '/task/site',
      name: 'taskSite',
      component: () => import('@/views/taskSite/index.vue'),
      meta: {
        title: '任务站点',
        icon: 'ic:baseline-add-task'
      }
    }
  ]
};

export default taskRouter;
