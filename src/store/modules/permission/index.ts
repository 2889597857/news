import { defineStore } from "pinia";
import { store } from "@/store";
import { ascending, filterTree, transformRouteToMenu } from "@/utils/route";
import { routes } from "@/router/routes";
import { cacheType } from "../type";
import { CustomRoute } from "@/interface/common";

const permissionStore = defineStore({
  id: "permission",
  state: () => ({
    // 静态路由
    constantRoutes: routes,
    // isNotMenu 为 false 的路由
    wholeRoutes: [],
    // 按钮权限
    buttonAuth: [],
    // 缓存页面keepAlive
    cachePageList: [],
  }),
  actions: {
    /**
     *
     * @param routes 动态路由
     * @returns
     */
    asyncActionRoutes(routes: CustomRoute) {
      if (this.wholeRoutes.length > 0) return;
      // 过滤 showLink 为 false  的路由，
      // 按照 rank 升序对路由进行排序
      // this.wholeRoutes = filterTree(ascending(this.constantRoutes.concat(routes)))
      console.log();
      this.wholeRoutes = transformRouteToMenu(
        this.constantRoutes.concat(routes)
      );
      // const getButtonAuth = (arrRoutes: Array<string>) => {
      // 	if (!arrRoutes || !arrRoutes.length) return
      // 	arrRoutes.forEach((v: any) => {
      // 		if (v.meta && v.meta.authority) {
      // 			this.buttonAuth.push(...v.meta.authority)
      // 		}
      // 		if (v.children) {
      // 			getButtonAuth(v.children)
      // 		}
      // 	})
      // }

      // getButtonAuth(this.wholeRoutes)
    },
    async changeSetting(router: any) {
      await this.asyncActionRoutes(router);
    },
    cacheOperate({ mode, name }: cacheType) {
      switch (mode) {
        case "add":
          // 把需要缓存的组件名称加入缓存数组
          this.cachePageList.push(name);
          // 去重
          this.cachePageList = [...new Set(this.cachePageList)];
          break;
        case "delete":
          // 查找需要删除缓存组件名称的位置
          const delIndex = this.cachePageList.findIndex((v) => v === name);
          // 从缓存数组中删除组件名
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
          break;
      }
    },
  },
});

export const usePermissionStore = () => permissionStore(store);
