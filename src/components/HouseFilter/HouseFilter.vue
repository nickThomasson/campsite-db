<template>
  <div>
    <SelectFilter
      v-for="filter in selectFilterItems"
      :key="filter.filterName"
      :filterName="filter.filterName"
      dispatchName="fetchHouses"
      :selectItems="filter.filterItems"
      :sourceData="houses"
      :filterLabel="i18n[filter.filterLabel]"
      :filterTitle="i18n[filter.filterTitle]"
    />
    <v-col cols="12">
      <h3>{{ i18n.CAMPSITE_FILTER_TITLE_SPECS }}</h3>
      <SwitchFilter
        v-for="filter in switchFilterItems"
        :key="filter.filterName"
        :filterName="filter.filterName"
        :filterLabel="i18n[filter.filterLabel]"
        dispatchName="fetchHouses"
      />
    </v-col>

    <RangeFilter
      :filterRange="data.ranges.beds"
      :filterTitle="i18n.CAMPSITE_FILTER_TITLE_BEDS"
      dispatchName="fetchHouses"
      filterName="bedFilter"
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
import SelectFilter from "@/components/shared/filter/SelectFilter.vue";
import SwitchFilter from "@/components/shared/filter/SwitchFilter.vue";
import RangeFilter from "@/components/shared/filter/RangeFilter.vue";
import PageSize from "@/components/shared/PageSize.vue";
export default {
  name: "HouseFilter",
  data() {
    return {
      selectFilterItems: [
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
      ],
      switchFilterItems: [
        {
          filterName: "kitchenFilter",
          filterLabel: "CAMPSITE_FILTER_LABEL_KITCHEN"
        },
        {
          filterName: "sanitaryFilter",
          filterLabel: "CAMPSITE_FILTER_LABEL_SANITARY"
        },
        {
          filterName: "wifiFilter",
          filterLabel: "CAMPSITE_FILTER_LABEL_WIFI"
        },
        {
          filterName: "avFilter",
          filterLabel: "CAMPSITE_FILTER_LABEL_AV"
        },
        {
          filterName: "recreationalFilter",
          filterLabel: "CAMPSITE_FILTER_LABEL_RECREATIONAL"
        }
      ]
    };
  },
  components: {
    SelectFilter,
    PageSize,
    FilterReset,
    SwitchFilter,
    RangeFilter
  },
  computed: {
    ...mapState(["app", "data"]),
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
      this.selectFilterItems[0].filterItems = this.houseStates;
      this.selectFilterItems[1].filterItems = this.houseCounties;
      this.selectFilterItems[2].filterItems = this.houseCities;
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
