<template>
  <v-app>
    <Header v-if="app.loadingStatus === status.Ready" />
    <Error />
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
import { renderRange } from "@/helper/renderItems";
import Error from "@/components/Error.vue";

export default Vue.extend({
  name: "App",
  components: {
    Header,
    Error
  },
  computed: {
    ...mapState(["authentication", "app", "data"]),
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
      "changeStatus",
      "fetchData",
      "setRanges"
    ]),
    getRanges() {
      this.setRanges({
        beds: renderRange({ source: this.data.houses, key: "beds" }),
        persons: renderRange({ source: this.data.results, key: "persons" }),
        rooms: renderRange({ source: this.data.houses, key: "rooms" }),
        itemCountCampsites: this.data.results.length,
        itemCountHouses: this.data.houses.length,
        priceCampsites: renderRange({
          source: this.data.results,
          key: "price"
        }),
        priceHouses: renderRange({ source: this.data.houses, key: "price" })
      });
    }
  },
  created() {
    this.initializeWishlist();
    this.authenticateClient().then(() => {
      this.changeStatus(Status.Loading);
      this.fetchData(this.authentication.token).then(() => {
        this.changeStatus(Status.Ready);
        this.getRanges();
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
