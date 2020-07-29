<template>
  <v-alert type="error" v-if="app.loadingStatus === status.Error">
    {{ i18n.CAMPSITE_ERROR }}
  </v-alert>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Status } from "@/helper/status";
export default {
  name: "Error",
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
