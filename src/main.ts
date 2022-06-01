import { createApp } from "vue";
import App from "./App.vue";
import "./styles/index.scss";
import { setupRouter } from "./router";
import { setupStore } from "@/store";
const app = createApp(App);

setupRouter(app);

app.mount("#app");
