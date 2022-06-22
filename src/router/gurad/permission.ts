import { useRouteStore } from '@/store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

/** 处理路由页面的权限 */
export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const route = useRouteStore();
  if (route.isInitAuthRoute) {
    next();
  } else {
    route.initMenu();
    next();
  }
}
