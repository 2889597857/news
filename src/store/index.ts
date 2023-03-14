import { createPinia } from 'pinia';
import type { App } from 'vue';

export function setupStore(app: App<Element>) {
  const store = createPinia();
  app.use(store);
}

export * from './counter';
export * from './modules';
export * from './subscribe';
export * from './timeStore';
