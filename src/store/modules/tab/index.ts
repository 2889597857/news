import { useRouterPush } from '@/composables';
import { storageLocal } from '@/utils';
import { defineStore } from 'pinia';
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { useThemeStore } from '../theme';
import {
  clearTabRoutes,
  getIndexInTabRoutes,
  getIndexInTabRoutesByRouteName,
  getTabRouteByVueRoute,
  getTabRoutes,
  isInTabRoutes
} from './helpers';

interface TabState {
  /** 多页签数据 */
  tabs: App.GlobalTabRoute[];
  /** 多页签首页 */
  homeTab: App.GlobalTabRoute;
  /** 当前激活状态的页签(路由fullPath) */
  activeTab: string;
}

export const useTabStore = defineStore('tab-store', {
  state: (): TabState => ({
    tabs: [],
    homeTab: {
      name: 'home',
      fullPath: '/',
      meta: {
        title: 'home'
      },
      scrollPosition: {
        left: 0,
        top: 0
      }
    },
    activeTab: ''
  }),
  getters: {
    /** 当前激活状态的页签索引 */
    activeTabIndex(state) {
      const { tabs, activeTab } = state;
      return tabs.findIndex(tab => tab.fullPath === activeTab);
    }
  },
  actions: {
    /** 重置Tab状态 */
    resetTabStore() {
      clearTabRoutes();
      this.$reset();
    },
    /** 缓存页签路由数据 */
    cacheTabRoutes() {
      storageLocal.setItem('multiTabRoutes', this.tabs);
    },
    /**
     * 设置当前路由对应的页签为激活状态
     * @param fullPath - 路由fullPath
     */
    setActiveTab(fullPath: string) {
      this.activeTab = fullPath;
    },
    /**
     * 设置当前路由对应的页签title
     * @param title - tab名称
     */
    setActiveTabTitle(title: string) {
      const item = this.tabs.find(tab => tab.fullPath === this.activeTab);
      if (item) {
        item.meta.title = title;
      }
    },
    /**
     * 初始化首页页签路由
     * @param routeHomeName - 路由首页的name
     * @param router - 路由实例
     */
    initHomeTab(routeHomeName: string, router: Router) {
      const routes = router.getRoutes();
      const findHome = routes.find(item => item.name === routeHomeName);
      if (findHome && !findHome.children.length) {
        // 有子路由的不能作为Tab
        this.homeTab = getTabRouteByVueRoute(findHome);
      }
    },
    /**
     * 添加多页签
     * @param route - 路由
     */
    addTab(route: RouteLocationNormalizedLoaded) {
      const tab = getTabRouteByVueRoute(route);

      if (isInTabRoutes(this.tabs, tab.fullPath)) {
        return;
      }

      const index = getIndexInTabRoutesByRouteName(this.tabs, route.name as string);

      if (index === -1) {
        this.tabs.push(tab);
        return;
      }

      const { multiTab = false } = route.meta;
      if (!multiTab) {
        this.tabs.splice(index, 1, tab);
        return;
      }

      this.tabs.push(tab);
    },
    /**
     * 删除多页签
     * @param fullPath - 路由fullPath
     */
    async removeTab(fullPath: string) {
      /** 路由跳转 */
      const { routerPush } = useRouterPush(false);
      /** 删除的 tab 是否为激活状态 */
      const isActive = this.activeTab === fullPath;
      /** 删除后的 tab */
      const updateTabs = this.tabs.filter(tab => tab.fullPath !== fullPath);
      /** 删除的不是当前激活的 tab */
      if (!isActive) {
        this.tabs = updateTabs;
      }
      /** 删除的是当前激活的 tab */
      if (isActive && updateTabs.length) {
        const activePath = updateTabs.at(-1).fullPath;
        const navigationFailure = await routerPush(activePath);
        if (!navigationFailure) {
          this.tabs = updateTabs;
          this.setActiveTab(activePath);
        }
      }
    },
    /**
     * 清空多页签(多页签首页保留)
     * @param excludes - 保留的多页签path
     */
    async clearTab(excludes: string[] = []) {
      /** 路由跳转 */
      const { routerPush } = useRouterPush(false);
      /** 首页 tab */
      const homePath = this.homeTab.fullPath;
      /** 清空后需要保留的 tab */
      const remain = [homePath, ...excludes];
      /** 当前激活的 tab 是否在保留 tabs 中 */
      const hasActive = remain.includes(this.activeTab);
      /** 从 this.tabs 过滤出需要保留的 tab */
      const updateTabs = this.tabs.filter(tab => remain.includes(tab.fullPath));
      if (hasActive) this.tabs = updateTabs;
      // 当前激活的 tab 不在 tabs, 选择 tabs 中最后一个 tab 为激活 tab
      if (!hasActive && updateTabs.length) {
        const activePath = updateTabs.at(-1).fullPath;
        const navigationFailure = await routerPush(activePath);
        if (!navigationFailure) {
          this.tabs = updateTabs;
          this.setActiveTab(activePath);
        }
      }
    },
    /**
     * 清除左边多页签
     * @param fullPath - 路由fullPath
     */
    clearLeftTab(fullPath: string) {
      const index = getIndexInTabRoutes(this.tabs, fullPath);
      if (index > -1) {
        const excludes = this.tabs.slice(index).map(item => item.fullPath);
        this.clearTab(excludes);
      }
    },
    /**
     * 清除右边多页签
     * @param fullPath - 路由fullPath
     */
    clearRightTab(fullPath: string) {
      const index = getIndexInTabRoutes(this.tabs, fullPath);
      if (index > -1) {
        const excludes = this.tabs.slice(0, index + 1).map(item => item.fullPath);
        this.clearTab(excludes);
      }
    },
    /** 清除所有多页签 */
    clearAllTab() {
      this.clearTab();
    },
    /**
     * 点击单个tab
     * @param fullPath - 路由fullPath
     */
    async handleClickTab(fullPath: string) {
      const { routerPush } = useRouterPush(false);

      const isActive = this.activeTab === fullPath;
      // 点击的 tab 不是激活的 tab
      if (!isActive) {
        const navigationFailure = await routerPush(fullPath);
        if (!navigationFailure) this.setActiveTab(fullPath);
      }
    },
    /**
     * 记录tab滚动位置
     * @param fullPath - 路由fullPath
     * @param position - tab当前页的滚动位置
     */
    recordTabScrollPosition(fullPath: string, position: { left: number; top: number }) {
      const index = getIndexInTabRoutes(this.tabs, fullPath);
      if (index > -1) {
        this.tabs[index].scrollPosition = position;
      }
    },
    /**
     * 获取tab滚动位置
     * @param fullPath - 路由fullPath
     */
    getTabScrollPosition(fullPath: string) {
      const position = {
        left: 0,
        top: 0
      };
      const index = getIndexInTabRoutes(this.tabs, fullPath);
      if (index > -1) {
        Object.assign(position, this.tabs[index].scrollPosition);
      }
      return position;
    },
    /** 初始化Tab状态 */
    iniTabStore(currentRoute: RouteLocationNormalizedLoaded) {
      const theme = useThemeStore();

      const tabs: App.GlobalTabRoute[] = theme.tab.isCache ? getTabRoutes() : [];

      const hasHome = getIndexInTabRoutesByRouteName(tabs, this.homeTab.name as string) > -1;
      if (!hasHome && this.homeTab.name !== 'root') {
        tabs.unshift(this.homeTab);
      }

      const isHome = currentRoute.fullPath === this.homeTab.fullPath;
      const index = getIndexInTabRoutesByRouteName(tabs, currentRoute.name as string);
      if (!isHome) {
        const currentTab = getTabRouteByVueRoute(currentRoute);
        if (!currentRoute.meta.multiTab) {
          if (index > -1) {
            tabs.splice(index, 1, currentTab);
          } else {
            tabs.push(currentTab);
          }
        } else {
          const hasCurrent = isInTabRoutes(tabs, currentRoute.fullPath);
          if (!hasCurrent) {
            tabs.push(currentTab);
          }
        }
      }

      this.tabs = tabs;
      this.setActiveTab(currentRoute.fullPath);
    }
  }
});
