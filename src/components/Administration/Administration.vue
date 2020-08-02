<template>
  <v-container>
    <v-row v-if="!userIsLoggedIn">
      <v-col
        cols="12"
        sm="10"
        offset-sm="1"
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
        xl="4"
        offset-xl="4"
      >
        <LoginForm />
      </v-col>
    </v-row>
    <v-row v-if="userIsLoggedIn">
      <v-col cols="12">
        <h1 data-lang-key="APP_ADMIN_TITLE">{{ i18n.APP_ADMIN_TITLE }}</h1>
      </v-col>
      <v-col cols="12" md="3">
        <Sidebar />
      </v-col>
      <v-col cols="12" md="9">
        <LanguageSettings />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import LoginForm from "@/components/Administration/partials/LoginForm.vue";
import LanguageSettings from "@/components/Administration/LanguageSettings/LanguageSettings.vue";
import Sidebar from "@/components/Administration/partials/Sidebar.vue";

export default {
  name: "Administration",
  components: {
    LoginForm,
    LanguageSettings,
    Sidebar
  },
  computed: {
    ...mapState(["authentication"]),
    ...mapGetters(["userIsLoggedIn", "i18n"])
  },
  methods: {
    ...mapActions(["logoutUser", "setActivePage"])
  },
  mounted() {
    this.setActivePage(this.i18n.APP_ADMIN_TITLE);
  },
  updated() {
    this.setActivePage(this.i18n.APP_ADMIN_TITLE);
  }
};
</script>
