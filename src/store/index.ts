import Vue from "vue";
import Vuex from "vuex";

import * as app from "./modules/app";
import * as authentication from "./modules/authentication";
import * as data from "./modules/data";
import * as detailPage from "./modules/detailPage";
import * as translations from "./modules/translations";
import * as wishlist from "./modules/wishlist";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    authentication,
    data,
    detailPage,
    wishlist,
    translations
  }
});
