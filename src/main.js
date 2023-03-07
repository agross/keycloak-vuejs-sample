import { createApp } from 'vue';
import VueKeyCloak from "@dsb-norge/vue-keycloak-js";
import { vueAxios } from "@baloise/vue-axios";
import App from './App.vue';

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App);

app.component("VueDatePicker", VueDatePicker);

app.use(vueAxios, {
  baseURL: "https://api.production.kessler.grossweber.com",
});

app.use(VueKeyCloak, {
  init: {
    flow: "standard", // default
    checkLoginIframe: false, // default
    onLoad: "login-required", // default,
    enableLogging: true,
  },
  config: {
    url: process.env.VUE_APP_KEYCLOAK_URL,
    realm: "wpm-dev",
    clientId: "wpm-client-app",
  },
  onReady(keycloak) {
    console.log("Keycloak ready", keycloak);

    app.mount("#app");
  },
  onInitError(err) {
    console.log("Keycloak init error", err);
  },
});
