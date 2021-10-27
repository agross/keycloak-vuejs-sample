import Keycloak from "keycloak-js";
import Vue from "vue";
import VueLogger from "vuejs-logger";
import App from "./App.vue";

const options = {
  isEnabled: true,
  logLevel: "debug",
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true
};

Vue.use(VueLogger, options);

let initOptions = {
  url: "https://keycloak.kessler.playground.grossweber.com/auth/",
  realm: "ldap",
  clientId: "ldap-test-vue",
  onLoad: "login-required"
};

let keycloak = Keycloak(initOptions);

keycloak
  .init({ onLoad: initOptions.onLoad })
  .then(auth => {
    if (!auth) {
      window.location.reload();
    } else {
      Vue.$log.info("Authenticated");

      new Vue({
        el: "#app",
        render: h => h(App, { props: { keycloak: keycloak } })
      });
    }

    // Token Refresh
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then(refreshed => {
          if (refreshed) {
            Vue.$log.info("Token refreshed" + refreshed);
          } else {
            Vue.$log.warn(
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
        .catch(() => {
          Vue.$log.error("Failed to refresh token");
        });
    }, 6000);
  })
  .catch(() => {
    Vue.$log.error("Authenticated Failed");
  });
