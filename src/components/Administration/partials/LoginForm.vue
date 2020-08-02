<template>
  <v-card class="mt-8 pa-3">
    <v-card-title data-lang-key="APP_ADMIN_LOGIN_TITLE">
      {{ i18n.APP_ADMIN_LOGIN_TITLE }}
    </v-card-title>
    <v-card-text>
      <v-form ref="authForm" v-model="valid" lazy-validation>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              data-lang-key="ADMIN_LOGIN_LABEL_USERNAME"
              v-model="username"
              :label="i18n.APP_ADMIN_LOGIN_LABEL_USERNAME"
              outlined
              prepend-icon="person"
              required
              type="mail"
              :rules="emptyRule"
              :disabled="loadingStatus"
            ></v-text-field>
            <v-text-field
              data-lang-key="APP_ADMIN_LOGIN_LABEL_PASSWORD"
              :label="i18n.APP_ADMIN_LOGIN_LABEL_PASSWORD"
              v-model="password"
              outlined
              type="password"
              prepend-icon="vpn_key"
              required
              :rules="emptyRule"
              :disabled="loadingStatus"
            ></v-text-field>
          </v-col>
          <v-col class="text-right" cols="12">
            <v-btn
              color="primary"
              :loading="loadingStatus"
              @click="login"
              data-lang-key="APP_ADMIN_LOGIN_BUTTON_LABEL"
            >
              {{ i18n.APP_ADMIN_LOGIN_BUTTON_LABEL }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Status } from "@/helper/status";
export default {
  name: "Administration",
  data: () => ({
    valid: undefined,
    emptyRule: [v => !!v || "Bitte Feld ausfüllen"],
    username: "",
    password: ""
  }),
  computed: {
    ...mapState(["authentication"]),
    ...mapGetters(["i18n"]),
    loadingStatus() {
      return this.authentication.userAuthStatus === Status.Loading;
    }
  },
  methods: {
    ...mapActions(["authenticateUser", "activateError", "deactivateError"]),
    login() {
      this.formValidation().then(() => {
        if (this.valid) {
          this.authenticateUser({
            email: this.username,
            password: this.password
          });
        }
      });
    },
    formValidation() {
      return new Promise(resolve => {
        this.$refs.authForm.validate();
        resolve();
      });
    }
  }
};
</script>
