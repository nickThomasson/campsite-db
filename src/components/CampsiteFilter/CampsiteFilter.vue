<template>
  <div>
    <AddressFilter
      v-for="(filter, index) in addressFilter"
      :key="index"
      :filterName="filter.filterName"
      dispatchName="fetchCampsites"
      :selectItems="filter.filterItems"
      :sourceData="campsites"
      :filterLabel="i18n[filter.filterLabel]"
      :filterTitle="i18n[filter.filterTitle]"
    />

    <PersonFilter />
    <v-col cols="12">
      <h3>{{ i18n.CAMPSITE_FILTER_TITLE_SPECS }}</h3>
      <KitchenFilter />
      <SanitaryFilter />
    </v-col>
    <v-col cols="12">
      <h3 class="mb-4">{{ i18n.CAMPSITE_FILTER_TITLE_SETTINGS }}</h3>
      <PageSize dispatchName="fetchCampsites" />
    </v-col>
    <FilterReset :key="app.resetKey" dispatchName="fetchCampsites" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import AddressFilter from "@/components/shared/filter/AddressFilter.vue";
import FilterReset from "@/components/shared/FilterReset.vue";
import PersonFilter from "@/components/CampsiteFilter/partials/PersonFilter";
import KitchenFilter from "@/components/CampsiteFilter/partials/KitchenFilter";
import SanitaryFilter from "@/components/CampsiteFilter/partials/SanitaryFilter";
import PageSize from "@/components/shared/PageSize.vue";
export default {
  name: "CampsiteFilter",
  data() {
    return {
      addressFilter: [
        {
          filterName: "stateFilter",
          filterItems: [],
          filterLabel: "CAMPSITE_FILTER_LABEL_STATE",
          filterTitle: "CAMPSITE_FILTER_TITLE_STATE"
        },
        {
          filterName: "countyFilter",
          filterItems: [],
          filterLabel: "CAMPSITE_FILTER_LABEL_COUNTY",
          filterTitle: "CAMPSITE_FILTER_TITLE_COUNTY"
        },
        {
          filterName: "cityFilter",
          filterItems: [],
          filterLabel: "CAMPSITE_FILTER_LABEL_CITY",
          filterTitle: "CAMPSITE_FILTER_TITLE_CITY"
        }
      ]
    };
  },
  components: {
    AddressFilter,
    PersonFilter,
    KitchenFilter,
    SanitaryFilter,
    PageSize,
    FilterReset
  },
  computed: {
    ...mapState(["app"]),
    ...mapGetters([
      "i18n",
      "campsites",
      "campsiteStates",
      "campsiteCounties",
      "campsiteCities"
    ])
  },
  methods: {
    setFilterItems() {
      this.addressFilter[0].filterItems = this.campsiteStates;
      this.addressFilter[1].filterItems = this.campsiteCounties;
      this.addressFilter[2].filterItems = this.campsiteCities;
    }
  },
  created() {
    this.setFilterItems();
  },
  updated() {
    this.setFilterItems();
  }
};
</script>
