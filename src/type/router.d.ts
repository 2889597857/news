import type { RouteRecordRaw } from 'vue-router';

/** 路由描述 */
declare interface RouteMeta {
  /** 路由名称 */
  title?: string;
  /** 缓存页面 */
  keepAlive?: boolean;
  /** 页面100%视高 */
  fullPage?: boolean;
  /** 不作为菜单 */
  isNotMenu?: boolean;
  /** 菜单和面包屑对应的图标 */
  icon?: string;
  /** 路由作为菜单时的排序 */
  order?: number;
}

/** 路由配置 */
declare type CustomRoute = RouteRecordRaw & { meta: RouteMeta };
