// import { ascending } from '@/utils/route';
import moduleRouter from '../modules';
import LOGIN from './constant';
import errorRouter from './error';
import ROUTE_HOME from './homeRoute';

/** 所有静态路由 */

export const allRoutes = [ROUTE_HOME, ...moduleRouter];
export const constantRoutes = [...LOGIN, errorRouter];
export { ROUTE_HOME };
