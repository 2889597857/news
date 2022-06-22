// import { usePermissionStore } from '@/store';
// import NProgress from '@/utils/progress';
// import { storageLocal } from '@/utils/storage/storage';
// import { uniqBy } from 'lodash-es';
// import type { Router } from 'vue-router';
// import { handleAliveRoute, initRouter } from './asyncRoutes';

// const whiteList = [];

// export const createRouterGuide = (router: Router) => {
//   router.beforeEach((to, from, next) => {
//     NProgress.start();
//     if (to.meta?.keepAlive) {
//       const newMatched = to.matched;
//       handleAliveRoute(newMatched, 'add');
//       // 页面整体刷新和点击标签页刷新
//       if (from.name === undefined || from.name === 'redirect') {
//         handleAliveRoute(newMatched);
//       }
//     }
//     const token = '是否登录';
//     if (token) {
//       // 已经登录
//       // 页面刷新
//       if (usePermissionStore().wholeRoutes.length === 0) {
//         // 初始化路由
//         initRouter('asd', router).then((router: Router) => {
//           router.push(to.path);
//           // 获取全部路由列表
//           const optionsRoutes = router.options?.routes;
//           // 获取路由访问记录
//           const localRoutes = storageLocal.getItem('responsive-routesInStorage');
//           const newLocalRoutes = [];
//           // 比较
//           optionsRoutes.forEach(ors => {
//             localRoutes.forEach(lrs => {
//               if (ors.path === lrs.parentPath) {
//                 newLocalRoutes.push(lrs);
//               }
//             });
//           });
//           // 存储路由访问记录
//           storageLocal.setItem('responsive-routesInStorage', uniqBy(newLocalRoutes, 'path'));
//         });
//       }
//       next();
//     } else {
//       // 未登录
//       if (to.path == '/login') {
//         next();
//       } else if (whiteList.indexOf(to.path) !== -1) {
//         next();
//         // 是否是路由白名单
//       }
//     }
//   });
//   router.afterEach(() => {
//     NProgress.done();
//   });
// };
import { useTitle } from '@vueuse/core';
import type { Router } from 'vue-router';
import { createPermissionGuard } from './permission';

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 开始 loadingBar
    window.$loadingBar?.start();
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next);
  });
  router.afterEach(to => {
    // 设置document title
    useTitle(to.meta.title as string);
    // 结束 loadingBar
    window.$loadingBar?.finish();
  });
}
