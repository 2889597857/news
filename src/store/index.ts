import { createPinia } from 'pinia';
// eslint-disable-next-line import/order
import type { App } from 'vue';

export const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export * from './modules';
