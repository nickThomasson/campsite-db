<template>
  <div>
    <SelectFilter
      v-for="filter in selectFilterItems"
      :key="filter.filterName"
      :filterName="filter.filterName"
      dispatchName="fetchCampsites"
      :selectItems="filter.filterItems"
      :sourceData="campsites"
      :filterLabel="i18n[filter.filterLabel]"
      :filterTitle="i18n[filter.filterTitle]"
    />

    <RangeFilter :filterRange="data.personCount" />
    <v-col cols="12">
      <h3>{{ i18n.CAMPSITE_FILTER_TITLE_SPECS }}</h3>
      <SwitchFilter
        v-for="filter in switchFilterItems"
        :key="filter.filterName"
        :filterName="filter.filterName"
        :filterLabel="i18n[filter.filterLabel]"
        dispatchName="fetchCampsites"
      />
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
import FilterReset from "@/components/shared/FilterReset.vue";
import SelectFilter from "@/components/shared/filter/SelectFilter.vue";
import SwitchFilter from "@/components/shared/filter/SwitchFilter.vue";
import RangeFilter from "@/components/shared/filter/RangeFilter.vue";
import PageSize from "@/components/shared/PageSize.vue";
export default {
  name: "CampsiteFilter",
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
        }
      ]
    };
  },
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
    ])
  },
  methods: {
    setFilterItems() {
      this.selectFilterItems[0].filterItems = this.campsiteStates;
      this.selectFilterItems[1].filterItems = this.campsiteCounties;
      this.selectFilterItems[2].filterItems = this.campsiteCities;
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
