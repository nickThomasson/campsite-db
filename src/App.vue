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
import { isEmpty } from "lodash";

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
    this.changeStatus(Status.Init);
    this.authenticateClient().then(() => {
      this.changeStatus(Status.Loading);
      this.fetchTranslations(this.authentication.token).then(() => {
        this.fetchData(this.authentication.token).then(() => {
          this.changeStatus(Status.Ready);
        });
      });
    });
    setInterval(() => {
      this.refreshToken(this.authentication.token);
    }, 1140000);
  },
  beforeDestroy() {
    clearInterval();
  },
  updated() {
    const params = this.$route.params;
    if (!isEmpty(this.$route.params)) {
      if ("campsiteId" in params) {
        this.fetchPageData({
          token: this.authentication.token,
          id: params.campsiteId
        });
      }
    }
  }
});
</script>
