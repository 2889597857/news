import type { App } from "vue";
import type { Router } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { createRouterGuide } from "../permission";
import { routes } from "../routes";

export const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export async function setupRouter(app: App) {
  // 挂载路由
  app.use(router);
  // // 路由守卫
  // createRouterGuide(router)
  // await router.isReady()
}
