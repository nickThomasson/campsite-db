<template>
  <v-app>
    <Header v-if="app.loadingStatus === status.Ready" />
    <v-progress-linear
      indeterminate
      color="accent"
      v-if="app.loadingStatus === status.Loading"
    ></v-progress-linear>
    <router-view v-if="app.loadingStatus === status.Ready" />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";
import { Status } from "@/helper/status";
import Header from "@/components/Header.vue";

export default Vue.extend({
  name: "App",
  components: {
    Header
  },
  computed: {
    ...mapState(["authentication", "app"]),
    ...mapGetters(["i18n"]),
    status() {
      return Status;
    }
  },
  methods: {
    ...mapActions([
      "initializeWishlist",
      "refreshToken",
      "authenticateClient",
      "fetchTranslations",
      "changeStatus",
      "fetchData",
      "changeStatus",
      "fetchPageData",
      "setActivePage"
    ])
  },
  created() {
    this.initializeWishlist();
    this.authenticateClient().then(() => {
      this.changeStatus(Status.Loading);
      this.fetchData(this.authentication.token).then(() => {
        this.changeStatus(Status.Ready);
      });
    });
    setInterval(() => {
      this.refreshToken(this.authentication.token);
    }, 1140000);
  },
  beforeDestroy() {
    clearInterval();
  }
});
</script>
