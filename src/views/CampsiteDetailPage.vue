<template>
  <v-app>
    <Header />
    <v-progress-linear
      indeterminate
      color="accent"
      v-if="detailPage.loadingStatus === status.Loading"
    ></v-progress-linear>
    <NotFound v-if="!detailPage.page" />
    <v-container
      v-if="detailPage.loadingStatus === status.Ready && mergedPageData"
    >
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" dense @click="goBack">{{
            i18n.CAMPSITE_APP_BACK
          }}</v-btn>
          <h1>{{ page.name }}</h1>
          <h5>{{ address.stadt }}, {{ address.bundesland }}</h5>
        </v-col>
      </v-row>
      <v-row v-if="houses">
        <HouseCard
          v-for="(house, index) in houses"
          :key="index"
          :house="house"
        />
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Status } from "@/helper/status";
import Header from "@/components/Header.vue";
import NotFound from "@/components/NotFound.vue";
import HouseCard from "@/components/HouseCard.vue";

export default {
  name: "CampsiteDetailPage",
  components: {
    Header,
    NotFound,
    HouseCard
  },
  computed: {
    ...mapState(["detailPage", "authentication", "i18n"]),
    ...mapGetters(["mergedPageData"]),
    status() {
      return Status;
    },
    page() {
      return this.mergedPageData ? this.mergedPageData.campsite : undefined;
    },
    address() {
      return this.mergedPageData ? this.mergedPageData.address : undefined;
    },
    houses() {
      return this.mergedPageData ? this.mergedPageData.house : undefined;
    },
    campsiteId() {
      return this.$route.params.campsiteId;
    }
  },
  methods: {
    ...mapActions(["fetchPageData", "authenticateClient", "changePageStatus"]),
    goBack() {
      this.$router.push({
        name: "CampsiteSearch"
      });
    }
  },
  mounted() {
    this.changePageStatus(Status.Init);
    this.authenticateClient().then(() => {
      this.fetchPageData({
        token: this.authentication.token,
        id: this.campsiteId
      });
    });
  }
};
</script>
