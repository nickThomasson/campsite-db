<template>
  <div>
    <AddressFilter
      v-for="(filter, index) in addressFilter"
      :key="index"
      :filterName="filter.filterName"
      dispatchName="fetchHouses"
      :selectItems="filter.filterItems"
      :sourceData="houses"
      :filterLabel="i18n[filter.filterLabel]"
      :filterTitle="i18n[filter.filterTitle]"
    />
    <v-col cols="12">
      <h3 class="mb-4">{{ i18n.CAMPSITE_FILTER_TITLE_SETTINGS }}</h3>
      <PageSize dispatchName="fetchHouses" />
    </v-col>
    <FilterReset :key="app.resetKey" dispatchName="fetchHouses" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import FilterReset from "@/components/shared/FilterReset.vue";
import AddressFilter from "@/components/shared/filter/AddressFilter.vue";
import PageSize from "@/components/shared/PageSize.vue";
export default {
  name: "HouseFilter",
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
    PageSize,
    FilterReset
  },
  computed: {
    ...mapState(["app"]),
    ...mapGetters([
      "i18n",
      "houses",
      "houseStates",
      "houseCounties",
      "houseCities"
    ])
  },
  methods: {
    setFilterItems() {
      this.addressFilter[0].filterItems = this.houseStates;
      this.addressFilter[1].filterItems = this.houseCounties;
      this.addressFilter[2].filterItems = this.houseCities;
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
