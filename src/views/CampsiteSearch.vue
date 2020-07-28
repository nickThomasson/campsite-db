<template>
  <v-app>
    <Header />
    <v-progress-linear
      indeterminate
      color="accent"
      v-if="app.loadingStatus === status.Loading"
    ></v-progress-linear>
    <v-container class="mt-6">
      <v-row v-if="app.loadingStatus === status.Ready">
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="3"
          xl="2"
          order="2"
          order-sm="2"
          order-md="1"
          order-lg="1"
          order-xl="1"
          class="d-none d-md-flex"
        >
          <CampsiteFilter :key="app.filterKey" />
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="8"
          lg="9"
          xl="10"
          order="1"
          order-sm="1"
          order-md="2"
          order-lg="2"
          order-xl="2"
          v-if="app.loadingStatus === status.Ready"
        >
          <SearchResults />
        </v-col>
        <Pagination />
      </v-row>
    </v-container>
    <v-btn
      color="primary"
      fab
      large
      dark
      bottom
      right
      fixed
      @click="switchFilterMenu"
      class="d-md-none"
    >
      <v-icon>tune</v-icon>
    </v-btn>
    <FilterDialog />
  </v-app>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { transformCurrency } from "@/helper/currency";
import CampsiteFilter from "@/components/CampsiteFilter/CampsiteFilter.vue";
import SearchResults from "@/components/CampsiteSearch/SearchResults.vue";
import { Status } from "@/helper/status";
import FilterDialog from "@/components/CampsiteSearch/FilterDialog.vue";
import Pagination from "@/components/CampsiteSearch/Pagination.vue";
import Header from "@/components/Header.vue";
export default {
  name: "CampsiteSearch",
  components: {
    CampsiteFilter,
    SearchResults,
    FilterDialog,
    Pagination,
    Header
  },
  computed: {
    ...mapState(["authentication", "searchResults", "i18n", "app"]),
    ...mapGetters(["mergedResults"]),
    status() {
      return Status;
    }
  },
  mounted() {
    this.changeStatus(Status.Init);
    this.authenticateClient().then(() => {
      this.fetchData(this.authentication.token);
    });
    setInterval(() => {
      this.authenticateClient();
    }, 60000);
  },
  methods: {
    ...mapActions([
      "authenticateClient",
      "fetchData",
      "changeStatus",
      "switchFilterMenu"
    ]),
    price(number) {
      return transformCurrency(number);
    }
  },
  beforeDestory() {
    clearInterval();
  }
};
</script>
