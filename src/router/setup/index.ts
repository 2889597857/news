import type { App } from 'vue';
import type { Router } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { createRouterGuard } from '../gurad';
import { constantRoutes, routes } from '../routes';

export const router: Router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...constantRoutes]
});

export async function setupRouter(app: App) {
  app.use(router);
  createRouterGuard(router);
  await router.isReady();
}
