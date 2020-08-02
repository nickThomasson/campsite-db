<template>
  <v-container>
    <v-row v-if="!userIsLoggedIn">
      <v-col offset="4" cols="4">
        <LoginForm />
      </v-col>
    </v-row>
    <v-row v-if="userIsLoggedIn">
      <v-col cols="12">
        <h1 data-lang-key="APP_ADMIN_TITLE">{{ i18n.APP_ADMIN_TITLE }}</h1>
      </v-col>
      <v-col cols="3">
        <Sidebar />
      </v-col>
      <v-col cols="9">
        <LanguageSettings />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import LoginForm from "@/components/Administration/partials/LoginForm.vue";
import LanguageSettings from "@/components/Administration/LanguageSettings.vue";
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
    ...mapActions(["logoutUser"])
  }
};
</script>
