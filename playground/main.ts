import { createApp } from "vue";
import App from "./App.vue";
import { createReload } from "../src/index";

createApp(App).use(createReload()).mount('#app')