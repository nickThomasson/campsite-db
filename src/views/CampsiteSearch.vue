<template>
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
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { transformCurrency } from "@/helper/currency";
import CampsiteFilter from "@/components/CampsiteFilter/CampsiteFilter.vue";
import SearchResults from "@/components/CampsiteSearch/SearchResults.vue";
import { Status } from "@/helper/status";
import FilterDialog from "@/components/CampsiteFilter/FilterDialog.vue";
import Pagination from "@/components/CampsiteSearch/Pagination.vue";
export default {
  name: "CampsiteSearch",
  components: {
    CampsiteFilter,
    SearchResults,
    FilterDialog,
    Pagination
  },
  computed: {
    ...mapState(["data", "app"]),
    ...mapGetters(["i18n", "campsites"]),
    status() {
      return Status;
    }
  },
  methods: {
    ...mapActions(["switchFilterMenu", "setActivePage"]),
    price(number) {
      return transformCurrency(number);
    }
  },
  updated() {
    this.setActivePage(this.i18n.CAMPSITE_SEARCH_TITLE);
  },
  mounted() {
    this.setActivePage(this.i18n.CAMPSITE_SEARCH_TITLE);
  }
};
</script>
