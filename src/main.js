import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import router from "./router/index.js";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';

createApp(App)
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })
    .use(ToastService)
    .mount("#app");

