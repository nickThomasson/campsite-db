<template>
  <div>
    <AddressFilter
      filterName="stateFilter"
      dispatchName="fetchHouses"
      :selectItems="houseStates"
      :sourceData="houses"
      :filterLabel="i18n.CAMPSITE_FILTER_LABEL_STATE"
      :filterTitle="i18n.CAMPSITE_FILTER_TITLE_STATE"
    />
    <AddressFilter
      filterName="countyFilter"
      dispatchName="fetchHouses"
      :selectItems="houseCounties"
      :sourceData="houses"
      :filterLabel="i18n.CAMPSITE_FILTER_LABEL_COUNTY"
      :filterTitle="i18n.CAMPSITE_FILTER_TITLE_COUNTY"
    />
    <AddressFilter
      filterName="cityFilter"
      dispatchName="fetchHouses"
      :selectItems="houseCities"
      :sourceData="houses"
      :filterLabel="i18n.CAMPSITE_FILTER_LABEL_CITY"
      :filterTitle="i18n.CAMPSITE_FILTER_TITLE_CITY"
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
  }
};
</script>
