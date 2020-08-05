<template>
  <v-row align-content="start">
    <v-col cols="12">
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
    </v-col>

    <v-col cols="12" v-if="moreFilter">
      <RangeFilter
        data-lang-key="CAMPSITE_FILTER_TITLE_PERSONS"
        :filterRange="data.ranges.persons"
        :filterTitle="i18n.CAMPSITE_FILTER_TITLE_PERSONS"
        dispatchName="fetchCampsites"
        filterName="personFilter"
      />
    </v-col>

    <v-col cols="12" v-if="moreFilter">
      <h3>{{ i18n.CAMPSITE_FILTER_TITLE_SPECS }}</h3>
      <SwitchFilter
        v-for="filter in switchFilterItems"
        :key="filter.filterName"
        :filterName="filter.filterName"
        :filterLabel="filter.filterLabel"
        dispatchName="fetchCampsites"
      />
    </v-col>

    <v-col cols="12" v-if="moreFilter">
      <h3 class="mb-4" data-lang-key="APP_SETTINGS">
        {{ i18n.APP_SETTINGS }}
      </h3>
      <PageSize dispatchName="fetchCampsites" />
    </v-col>

    <v-col cols="12">
      <v-btn
        color="primary"
        dark
        @click="moreFilter = !moreFilter"
        :data-lang-key="
          moreFilter ? 'APP_FILTER_BUTTON_LESS' : 'APP_FILTER_BUTTON_MORE'
        "
      >
        <v-icon class="mr-3">
          {{ moreFilter ? "remove_circle_outline" : "add_circle_outline" }}
        </v-icon>
        {{
          moreFilter ? i18n.APP_FILTER_BUTTON_LESS : i18n.APP_FILTER_BUTTON_MORE
        }}
      </v-btn>
    </v-col>

    <FilterReset :key="app.resetKey" dispatchName="fetchCampsites" />
  </v-row>
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
  data() {
    return {
      moreFilter: false
    };
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
  }
};
</script>
