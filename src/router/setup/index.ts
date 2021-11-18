import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuide } from '../permission'
import { routes } from '../routes'

export const router: Router = createRouter({
	history: createWebHistory(),
	routes,
})

export async function setupRouter(app: App) {
	app.use(router)
	createRouterGuide(router)
	await router.isReady()
}
