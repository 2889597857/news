import { router } from '@/router';
import { allRoutes } from '@/router/routes';
import { transformRouteToMenu } from '@/utils';
import { defineStore } from 'pinia';
import { useTabStore } from '../tab';

export const useRouteStore = defineStore('route-store', {
  state: () => ({
    isInitAuthRoute: false,
    menus: []
  }),
  actions: {
    initMenu() {
      const { initHomeTab } = useTabStore();
      initHomeTab('home', router);
      this.menus = transformRouteToMenu(allRoutes);
      this.isInitAuthRoute = true;
    }
  }
});
