import { createApp } from 'vue';
import Keycloak from 'keycloak-js';
import App from './App.vue';

const keycloakOptions = {
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: "ldap",
  clientId: "ldap-test-vue",
  onLoad: "login-required",
};

const keycloak = Keycloak(keycloakOptions);

keycloak
  .init({ onLoad: keycloakOptions.onLoad })
  .then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.log("Authenticated");

      createApp(App,
        { props: { keycloak: keycloak } ,
      }).mount("#app");
    }

    // Token Refresh
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.log("Token refreshed" + refreshed);
          } else {
            console.log(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .catch((err) => {
          console.log("Failed to refresh token: " + JSON.stringify(err));
        });
    }, 6000);
  })
  .catch((err) => {
    console.log("Authentication failed: " + JSON.stringify(err));
  });
