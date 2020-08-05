<template>
  <v-container class="mt-6" fluid>
    <v-row v-if="app.loadingStatus === status.Ready">
      <v-col cols="12" sm="12" md="4" lg="3" xl="2" class="d-none d-md-flex">
        <HouseFilter :key="app.filterKey" />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="8"
        lg="9"
        xl="10"
        v-if="app.loadingStatus === status.Ready"
      >
        <HouseSearchResults />
      </v-col>
      <Pagination
        dispatchName="fetchHouses"
        :pageCount="pageCountHouses"
        :totalCount="data.ranges.itemCountHouses"
      />
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
import HouseFilter from "@/components/HouseFilter/HouseFilter.vue";
import HouseSearchResults from "@/components/HouseSearch/HouseSearchResults.vue";
import { Status } from "@/helper/status";
import FilterDialog from "@/components/HouseFilter/FilterDialog.vue";
import Pagination from "@/components/shared/Pagination.vue";
export default {
  name: "HouseSearch",
  components: {
    HouseFilter,
    HouseSearchResults,
    FilterDialog,
    Pagination
  },
  computed: {
    ...mapState(["data", "app", "authentication"]),
    ...mapGetters([
      "i18n",
      "houses",
      "combinedFilter",
      "pageCountCampsites",
      "pageCountHouses"
    ]),
    status() {
      return Status;
    }
  },
  methods: {
    ...mapActions(["switchFilterMenu", "setActivePage", "applyReset"])
  },
  updated() {
    this.setActivePage(this.i18n.HOUSE_SEARCH_PAGE_TITLE);
  },
  mounted() {
    this.setActivePage(this.i18n.HOUSE_SEARCH_PAGE_TITLE);
    if (this.combinedFilter) {
      this.applyReset({
        token: this.authentication.token
      });
    }
  }
};
</script>
