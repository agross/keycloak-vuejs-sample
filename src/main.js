import { createApp } from 'vue';
import VueKeyCloak from "@dsb-norge/vue-keycloak-js";
import App from './App.vue';

const app = createApp(App);

app.use(VueKeyCloak, {
  init: {
    flow: "standard", // default
    checkLoginIframe: false, // default
    onLoad: "login-required", // default,
    enableLogging: true
  },
  config: {
    url: process.env.VUE_APP_KEYCLOAK_URL,
    realm: "ldap",
    clientId: "ldap-test-vue",
  },
  onReady(keycloak) {
    console.log("Keycloak ready", keycloak);

    app.mount("#app");
  },
  onInitError(err) {
    console.log("Keycloak init error", err);
  },
});
