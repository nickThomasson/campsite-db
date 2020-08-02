<template>
  <div>
    <SelectFilter
      v-for="filter in selectFilterItems"
      :key="filter.filterName"
      :filterName="filter.filterName"
      dispatchName="fetchCampsites"
      :selectItems="filter.filterItems"
      :sourceData="campsites"
      :filterLabel="filter.filterLabel"
      :filterTitle="filter.filterTitle"
    />

    <RangeFilter
      :filterRange="data.ranges.persons"
      :filterTitle="i18n.CAMPSITE_FILTER_TITLE_PERSONS"
      dispatchName="fetchCampsites"
      filterName="personFilter"
    />

    <v-col cols="12">
      <h3>{{ i18n.CAMPSITE_FILTER_TITLE_SPECS }}</h3>
      <SwitchFilter
        v-for="filter in switchFilterItems"
        :key="filter.filterName"
        :filterName="filter.filterName"
        :filterLabel="filter.filterLabel"
        dispatchName="fetchCampsites"
      />
    </v-col>
    <v-col cols="12">
      <h3 class="mb-4" data-lang-key="APP_SETTINGS">{{ i18n.APP_SETTINGS }}</h3>
      <PageSize dispatchName="fetchCampsites" />
    </v-col>
    <FilterReset :key="app.resetKey" dispatchName="fetchCampsites" />
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
  name: "CampsiteFilter",
  components: {
    SelectFilter,
    SwitchFilter,
    RangeFilter,
    PageSize,
    FilterReset
  },
  computed: {
    ...mapState(["app", "data"]),
    ...mapGetters([
      "i18n",
      "campsites",
      "campsiteStates",
      "campsiteCounties",
      "campsiteCities"
    ]),
    selectFilterItems() {
      return [
        {
          filterName: "stateFilter",
          filterItems: this.campsiteStates,
          filterLabel: this.i18n.APP_FILTER_LABEL_STATE,
          filterTitle: this.i18n.APP_FILTER_TITLE_STATE
        },
        {
          filterName: "countyFilter",
          filterItems: this.campsiteCounties,
          filterLabel: this.i18n.APP_FILTER_LABEL_COUNTY,
          filterTitle: this.i18n.APP_FILTER_TITLE_COUNTY
        },
        {
          filterName: "cityFilter",
          filterItems: this.campsiteCities,
          filterLabel: this.i18n.APP_FILTER_LABEL_CITY,
          filterTitle: this.i18n.APP_FILTER_TITLE_CITY
        }
      ];
    },
    switchFilterItems() {
      return [
        {
          filterName: "kitchenFilter",
          filterLabel: this.i18n.CAMPSITE_FILTER_LABEL_KITCHEN
        },
        {
          filterName: "sanitaryFilter",
          filterLabel: this.i18n.CAMPSITE_FILTER_LABEL_SANITARY
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
