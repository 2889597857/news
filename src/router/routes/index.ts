// import { ascending } from '@/utils/route';
import moduleRouter from '../modules';
import ROUTE_HOME from './homeRoute';
/** 所有静态路由 */

export const routes = [ROUTE_HOME, ...moduleRouter];
export { ROUTE_HOME };
