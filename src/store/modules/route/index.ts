import { allRoutes } from '@/router/routes';
import { transformRouteToMenu } from '@/utils';
import { defineStore } from 'pinia';

export const useRouteStore = defineStore('route-store', {
  state: () => ({
    isInitAuthRoute: false,
    menus: []
  }),
  actions: {
    initMenu() {
      this.menus = transformRouteToMenu(allRoutes);
      this.isInitAuthRoute = true;
    }
  }
});
