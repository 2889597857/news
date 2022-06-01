import ROUTE_HOME from './homeRoute'
import customRoutes from '../modules'
import constantRoutes from './constant'
import { ascending } from '@/utils/route'

/** 所有静态路由 */
export const routes = ascending([ROUTE_HOME, ...customRoutes, ...constantRoutes])
export { ROUTE_HOME, customRoutes }
