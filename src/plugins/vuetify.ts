import Vue from "vue";
import Vuetify from "vuetify/lib";
import de from "vuetify/src/locale/de";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#01396d",
        secondary: "#424242",
        accent: "#970026",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  lang: {
    locales: { de },
    current: "de"
  }
});
