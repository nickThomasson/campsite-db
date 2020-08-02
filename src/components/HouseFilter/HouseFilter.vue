<template>
  <div>
    <SelectFilter
      v-for="filter in selectFilterItems"
      :key="filter.filterName"
      :filterName="filter.filterName"
      dispatchName="fetchHouses"
      :selectItems="filter.filterItems"
      :sourceData="houses"
      :filterLabel="filter.filterLabel"
      :filterTitle="filter.filterTitle"
    />
    <v-col cols="12">
      <h3 data-lang-key="HOUSE_FILTER_TITLE_SPECS">
        {{ i18n.HOUSE_FILTER_TITLE_SPECS }}
      </h3>
      <SwitchFilter
        v-for="filter in switchFilterItems"
        :key="filter.filterName"
        :filterName="filter.filterName"
        :filterLabel="filter.filterLabel"
        dispatchName="fetchHouses"
      />
    </v-col>

    <RangeFilter
      data-lang-key="HOUSE_FILTER_TITLE_BEDS"
      :filterRange="data.ranges.beds"
      :filterTitle="i18n.HOUSE_FILTER_TITLE_BEDS"
      dispatchName="fetchHouses"
      filterName="bedFilter"
    />
    <v-col cols="12">
      <h3 class="mb-4" data-lang-key="APP_SETTINGS">{{ i18n.APP_SETTINGS }}</h3>
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
    ]),
    selectFilterItems() {
      return [
        {
          filterName: "stateFilter",
          filterItems: this.houseStates,
          filterLabel: this.i18n.APP_FILTER_LABEL_STATE,
          filterTitle: this.i18n.APP_FILTER_TITLE_STATE
        },
        {
          filterName: "countyFilter",
          filterItems: this.houseCounties,
          filterLabel: this.i18n.APP_FILTER_LABEL_COUNTY,
          filterTitle: this.i18n.APP_FILTER_TITLE_COUNTY
        },
        {
          filterName: "cityFilter",
          filterItems: this.houseCities,
          filterLabel: this.i18n.APP_FILTER_LABEL_CITY,
          filterTitle: this.i18n.APP_FILTER_TITLE_CITY
        }
      ];
    },
    switchFilterItems() {
      return [
        {
          filterName: "kitchenFilter",
          filterLabel: this.i18n.HOUSE_FILTER_LABEL_KITCHEN
        },
        {
          filterName: "sanitaryFilter",
          filterLabel: this.i18n.HOUSE_FILTER_LABEL_SANITARY
        },
        {
          filterName: "wifiFilter",
          filterLabel: this.i18n.HOUSE_FILTER_LABEL_WIFI
        },
        {
          filterName: "avFilter",
          filterLabel: this.i18n.HOUSE_FILTER_LABEL_AV
        },
        {
          filterName: "recreationalFilter",
          filterLabel: this.i18n.HOUSE_FILTER_LABEL_RECREATIONAL
        }
      ];
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
