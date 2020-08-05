<template>
  <v-row align-content="start">
    <v-col cols="12">
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
    </v-col>

    <v-col cols="12" v-if="moreFilter">
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

    <v-col cols="12" v-if="moreFilter">
      <RangeFilter
        data-lang-key="HOUSE_FILTER_TITLE_BEDS"
        :filterRange="data.ranges.beds"
        :filterTitle="i18n.HOUSE_FILTER_TITLE_BEDS"
        dispatchName="fetchHouses"
        filterName="bedFilter"
      />
    </v-col>

    <v-col cols="12" v-if="moreFilter">
      <h3 class="mb-4" data-lang-key="APP_SETTINGS">
        {{ i18n.APP_SETTINGS }}
      </h3>
      <PageSize dispatchName="fetchHouses" />
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

    <FilterReset :key="app.resetKey" dispatchName="fetchHouses" />
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
  name: "HouseFilter",
  components: {
    SelectFilter,
    PageSize,
    FilterReset,
    SwitchFilter,
    RangeFilter
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
  }
};
</script>
