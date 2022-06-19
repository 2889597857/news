import type { Router } from 'vue-router';
import { uniqBy } from 'lodash-es';
import { usePermissionStore } from '@/store';
import NProgress from '@/utils/progress';
import { storageLocal } from '@/utils/storage/storage';
import { handleAliveRoute, initRouter } from './asyncRoutes';

const whiteList = [];

export const createRouterGuide = (router: Router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.meta?.keepAlive) {
      const newMatched = to.matched;
      handleAliveRoute(newMatched, 'add');
      // 页面整体刷新和点击标签页刷新
      if (from.name === undefined || from.name === 'redirect') {
        handleAliveRoute(newMatched);
      }
    }
    const token = '是否登录';
    if (token) {
      // 已经登录
      // 页面刷新
      if (usePermissionStore().wholeRoutes.length === 0) {
        // 初始化路由
        initRouter('asd', router).then((router: Router) => {
          router.push(to.path);
          // 获取全部路由列表
          const optionsRoutes = router.options?.routes;
          // 获取路由访问记录
          const localRoutes = storageLocal.getItem('responsive-routesInStorage');
          const newLocalRoutes = [];
          // 比较
          optionsRoutes.forEach(ors => {
            localRoutes.forEach(lrs => {
              if (ors.path === lrs.parentPath) {
                newLocalRoutes.push(lrs);
              }
            });
          });
          // 存储路由访问记录
          storageLocal.setItem('responsive-routesInStorage', uniqBy(newLocalRoutes, 'path'));
        });
      }
      next();
    } else {
      // 未登录
      if (to.path !== '/login') {
        // 是否是路由白名单
        if (whiteList.indexOf(to.path) !== -1) {
          next();
        } else {
          next({ path: '/login' });
        }
      } else {
        next();
      }
    }
  });
  router.afterEach(() => {
    NProgress.done();
  });
};
