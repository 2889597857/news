// import { CustomRoute, GlobalMenuOption } from '@/interface/common';

// export function transformRouteToMenu(routes: CustomRoute[]) {
//   const globalMenu: GlobalMenuOption[] = [];
//   routes.forEach(route => {
//     const { name, path, meta } = route;
//     const routeName = name as string;
//     let menuChildren: GlobalMenuOption[] | undefined;
//     if (route.children) {
//       menuChildren = transformRouteToMenu(route.children as CustomRoute[]);
//     }
//     const menuItem: GlobalMenuOption = addPartialProps(
//       {
//         key: routeName,
//         label: meta?.title ?? routeName,
//         routeName,
//         routePath: path
//       },
//       meta?.icon,
//       menuChildren
//     );
//     if (asMenu(route)) {
//       globalMenu.push(menuItem);
//     } else if (menuChildren) {
//       globalMenu.push(...menuChildren);
//     }
//   });
//   return globalMenu;
// }
// /** 给菜单添加可选属性 */
// function addPartialProps(menuItem: GlobalMenuOption, icon?: string, children?: GlobalMenuOption[]) {
//   const item = { ...menuItem };
//   if (icon) {
//     // Object.assign(item, { icon: iconifyRender(icon) })
//   }
//   if (children) {
//     Object.assign(item, { children });
//   }
//   return item;
// }
// /** 判断路由是否作为菜单 */
// function asMenu(route: CustomRoute) {
//   return route.meta?.isNotMenu;
// }

// /**
//  * 按照路由中meta下的rank等级升序来排序路由
//  * @param arr
//  * @returns
//  */
// export const ascending = (arr: any[]) => {
//   return arr.sort((a: any, b: any) => {
//     return a?.meta?.rank - b?.meta?.rank;
//   });
// };
// /**
//  * 过滤meta中showLink为false的路由
//  * @param data
//  * @returns
//  */
// export const filterTree = (data: any[]) => {
//   const newTree = data.filter(v => v.meta.showLink);
//   newTree.forEach(v => v.children && (v.children = filterTree(v.children)));
//   return newTree;
// };
// export const increaseIndexes = val => {
//   return Object.keys(val)
//     .map(v => {
//       return {
//         ...val[v],
//         key: v
//       };
//     })
//     .filter(v => v.meta && v.meta.showLink);
// };
