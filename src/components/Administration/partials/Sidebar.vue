<template>
  <v-card>
    <v-card-title data-lang-key="APP_ADMIN_SIDEBAR_TITLE">
      {{ i18n.APP_ADMIN_SIDEBAR_TITLE }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="auto">
          <v-avatar color="primary" size="62">
            <span class="white--text headline">{{ initials }}</span>
          </v-avatar>
        </v-col>
        <v-col cols="auto" align-self="center">
          <p>{{ user.first_name }}, {{ user.last_name }}</p>
          <a @click="logoutUser(authentication.userData.token)">Logout</a>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Administration",
  computed: {
    ...mapState(["authentication"]),
    ...mapGetters(["i18n"]),
    user() {
      return this.authentication.userData.user;
    },
    initials() {
      const first = this.user.first_name.charAt(0);
      const last = this.user.last_name.charAt(0);
      return `${first.toUpperCase()}${last.toUpperCase()}`;
    }
  },
  methods: {
    ...mapActions(["logoutUser"])
  }
};
</script>
