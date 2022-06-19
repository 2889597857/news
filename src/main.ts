import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.scss';
import { setupRouter } from './router';
import { setupStore } from '@/store';

function setupApp() {
  const app = createApp(App);

  setupStore(app);
  setupRouter(app);

  app.mount('#app');
}

setupApp();
