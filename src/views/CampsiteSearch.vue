<template>
  <v-container class="mt-6" fluid>
    <v-row v-if="app.loadingStatus === status.Ready">
      <v-col cols="12" sm="12" md="3" lg="3" xl="2" class="d-none d-md-flex">
        <CampsiteFilter :key="app.filterKey" />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="9"
        lg="9"
        xl="10"
        v-if="app.loadingStatus === status.Ready"
      >
        <CampsiteSearchResults />
      </v-col>
      <Pagination
        dispatchName="fetchCampsites"
        :pageCount="pageCountCampsites"
        :totalCount="data.ranges.itemCountCampsites"
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
import CampsiteFilter from "@/components/CampsiteFilter/CampsiteFilter.vue";
import CampsiteSearchResults from "@/components/CampsiteSearch/CampsiteSearchResults.vue";
import { Status } from "@/helper/status";
import FilterDialog from "@/components/CampsiteFilter/FilterDialog.vue";
import Pagination from "@/components/shared/Pagination.vue";
export default {
  name: "CampsiteSearch",
  components: {
    CampsiteFilter,
    CampsiteSearchResults,
    FilterDialog,
    Pagination
  },
  computed: {
    ...mapState(["data", "app", "authentication"]),
    ...mapGetters([
      "i18n",
      "campsites",
      "combinedFilter",
      "pageCountCampsites"
    ]),
    status() {
      return Status;
    }
  },
  methods: {
    ...mapActions(["switchFilterMenu", "setActivePage", "applyReset"])
  },
  updated() {
    this.setActivePage(this.i18n.CAMPSITE_SEARCH_PAGE_TITLE);
  },
  mounted() {
    this.setActivePage(this.i18n.CAMPSITE_SEARCH_PAGE_TITLE);
    if (this.combinedFilter) {
      this.applyReset({
        token: this.authentication.token
      });
    }
  }
};
</script>
