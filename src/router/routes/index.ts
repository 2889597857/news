import { ascending } from '@/utils/route';
import customRoutes from '../modules';
import ROUTE_HOME from './homeRoute';
import constantRoutes from './constant';
/** 所有静态路由 */
export const routes = ascending([
  ROUTE_HOME
  //   ...customRoutes,
  //   ...constantRoutes,
]);
export { ROUTE_HOME };
