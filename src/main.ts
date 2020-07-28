/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./styles/main.scss";
import { writeToStorage } from "@/helper/localStorage";

Vue.config.productionTip = false;

store.subscribe((mutation: any, state: any) => {
  const wishlist = state.wishlist;
  writeToStorage("wishlist", wishlist);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
