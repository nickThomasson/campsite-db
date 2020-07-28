<template>
  <v-alert type="error" v-if="app.loadingStatus === status.Error">
    {{ i18n.CAMPSITE_ERROR }}
  </v-alert>
</template>

<script>
import { mapState } from "vuex";
import { Status } from "@/helper/status";
export default {
  name: "Error",
  computed: {
    ...mapState(["i18n", "app"]),
    status() {
      return Status;
    }
  }
};
</script>

<style></style>
