<template>
  <v-alert type="error" v-if="app.showError" data-lang-key="APP_ERROR">
    {{ app.errorMessage }}
  </v-alert>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Status } from "@/helper/status";
export default {
  name: "Error",
  props: {
    show: Boolean,
    message: String
  },
  computed: {
    ...mapState(["app"]),
    ...mapGetters(["i18n"]),
    status() {
      return Status;
    }
  }
};
</script>

<style></style>
