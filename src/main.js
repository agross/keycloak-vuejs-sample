import { createApp } from 'vue';
import { vueKeycloak } from "@baloise/vue-keycloak";
import App from './App.vue';

const app = createApp(App);

app.use(vueKeycloak, {
  initOptions: {
    flow: 'standard', // default
    checkLoginIframe: false, // default
    onLoad: 'login-required', // default
  },
  config: {
    url: process.env.VUE_APP_KEYCLOAK_URL,
    realm: 'ldap',
    clientId: 'ldap-test-vue'
  }
});

app.mount("#app");
