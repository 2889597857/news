import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/loginApp.vue'),
    meta: {
      showLink: false
    }
  }
];
export default routes;
