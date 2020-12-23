/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./styles/main.scss";
import { writeToStorage } from "@/helper/localStorage";
/* import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations"; */
import { mapActions } from "vuex";

Vue.config.productionTip = false;

/* Sentry.init({
  dsn:
    "https://fae3c24da6be49f998c65f1b74d52d67@o432353.ingest.sentry.io/5384965",
  integrations: [new VueIntegration({ Vue, attachProps: true })]
}); */

store.subscribe((mutation: any, state: any) => {
  const wishlist = state.wishlist;
  writeToStorage({ key: "wishlist", value: wishlist });
});

new Vue({
  router,
  store,
  vuetify,
  methods: {
    ...mapActions(["initializeWishlist"])
  },
  created() {
    this.initializeWishlist();
  },
  render: h => h(App)
}).$mount("#app");
