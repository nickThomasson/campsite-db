<template>
  <div>
    <AddressFilter
      filterName="stateFilter"
      dispatchName="fetchCampsites"
      :selectItems="campsiteStates"
      :sourceData="campsites"
      :filterLabel="i18n.CAMPSITE_FILTER_LABEL_STATE"
      :filterTitle="i18n.CAMPSITE_FILTER_TITLE_STATE"
    />
    <AddressFilter
      filterName="countyFilter"
      dispatchName="fetchCampsites"
      :selectItems="campsiteCounties"
      :sourceData="campsites"
      :filterLabel="i18n.CAMPSITE_FILTER_LABEL_COUNTY"
      :filterTitle="i18n.CAMPSITE_FILTER_TITLE_COUNTY"
    />
    <AddressFilter
      filterName="cityFilter"
      dispatchName="fetchCampsites"
      :selectItems="campsiteCities"
      :sourceData="campsites"
      :filterLabel="i18n.CAMPSITE_FILTER_LABEL_CITY"
      :filterTitle="i18n.CAMPSITE_FILTER_TITLE_CITY"
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
  }
};
</script>
