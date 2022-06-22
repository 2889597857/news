// import { RouteComponent, Router, RouteRecordNormalized } from 'vue-router';
// import { usePermissionStore } from '@/store';
// import { getAsyncRoutes } from '@/api';
// import { BasicLayout } from '@/layout';
// import { ascending } from '@/utils/route';

// const modulesRoutes = import.meta.glob('/src/views/*/*.vue');

// // 过滤后端传来的动态路由 重新生成规范路由
// export const addAsyncRoutes = (arrRoutes: Array<RouteComponent>) => {
//   if (!arrRoutes || !arrRoutes.length) return;
//   arrRoutes.forEach((v: any) => {
//     if (v.redirect) {
//       v.component = BasicLayout;
//     } else {
//       v.component = modulesRoutes[`/src/views${v.path}/index.vue`];
//     }
//     if (v.children) {
//       addAsyncRoutes(v.children);
//     }
//   });
//   // eslint-disable-next-line consistent-return
//   return arrRoutes;
// };
// // 处理缓存路由（添加、删除、刷新）
// export const handleAliveRoute = (matched: RouteRecordNormalized[], mode?: string) => {
//   switch (mode) {
//     case 'add':
//       matched.forEach(v => {
//         usePermissionStore().cacheOperate({ mode: 'add', name: v.name });
//       });
//       break;
//     case 'delete':
//       usePermissionStore().cacheOperate({
//         mode: 'delete',
//         name: matched[matched.length - 1].name
//       });
//       break;
//     default:
//       usePermissionStore().cacheOperate({
//         mode: 'delete',
//         name: matched[matched.length - 1].name
//       });

//       setTimeout(() => {
//         matched.forEach(v => {
//           usePermissionStore().cacheOperate({ mode: 'add', name: v.name });
//         });
//       }, 100);
//   }
// };
// // 初始化路由
// /**
//  *
//  * @param name 用户名称 不同的用户有不同的权限
//  * @param router 路由实例
//  * @returns 路由列表 静态路由 + 动态路由
//  */
// export function initRouter(name: string, router: Router) {
//   return new Promise(resolve => {
//     // 从后端获取用户路由
//     getAsyncRoutes({ name }).then(({ info }) => {
//       if (info.length === 0) {
//         usePermissionStore().changeSetting(info);
//       } else {
//         // 过滤后端传来的动态路由 重新生成规范路由
//         addAsyncRoutes(info).map((v: any) => {
//           // 获取全部路由列表
//           const { routes } = router.options;
//           // 查看路由路由列表是否有该路由，防止重复添加路由
//           const isExist = routes.findIndex(value => value.path === v.path);

//           if (isExist !== -1) return;

//           // 切记将路由push到routes后还需要使用addRoute，这样路由才能正常跳转
//           router.options.routes.push(v);
//           // 最终路由进行升序
//           ascending(router.options.routes);
//           // 添加路由
//           router.addRoute(v.name, v);
//           usePermissionStore().changeSetting(info);

//           resolve(router);
//         });
//       }
//       router.addRoute({
//         path: '/:pathMatch(.*)',
//         redirect: '/error/404'
//       });
//     });
//   });
// }
import { useRouteStore } from '@/store';
import { getToken } from '@/utils';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

/**
 * 动态路由
 */
export async function createDynamicRouteGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const route = useRouteStore();
  const isLogin = Boolean(getToken());

  // 初始化权限路由
  if (!route.isInitAuthRoute) {
    // 未登录情况下直接回到登录页，登录成功后再加载权限路由
    if (!isLogin) {
      if (to.name === 'login') {
        next();
      } else {
        const redirect = to.fullPath;
        next({ name: 'login', query: { redirect } });
      }
      return false;
    }

    route.initMenu();

    if (to.name === 'not-found-page') {
      // 动态路由没有加载导致被not-found-page路由捕获，等待权限路由加载好了，回到之前的路由
      // 若路由是从根路由重定向过来的，重新回到根路由
      const ROOT_ROUTE_NAME = 'root';
      const path = to.redirectedFrom?.name === ROOT_ROUTE_NAME ? '/' : to.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  }

  // 权限路由已经加载，仍然未找到，重定向到not-found
  if (to.name === 'not-found-page') {
    next({ name: 'not-found', replace: true });
    return false;
  }

  return true;
}
