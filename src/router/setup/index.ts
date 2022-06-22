import type { App } from 'vue';
import type { Router } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { createRouterGuard } from '../gurad';
import { routes } from '../routes';

export const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export async function setupRouter(app: App) {
  app.use(router);
  createRouterGuard(router);
  await router.isReady();
}
