<template>
  <div>
    <CountyFilter />
    <CityFilter />
    <PersonFilter />
    <h3>{{ i18n.CAMPSITE_FILTER_TITLE_SPECS }}</h3>
    <KitchenFilter />
    <SanitaryFilter />
    <FilterReset :key="searchResults.resetKey" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FilterReset from "@/components/FilterReset.vue";
import CountyFilter from "@/components/CampsiteFilter/partials/CountyFilter";
import CityFilter from "@/components/CampsiteFilter/partials/CityFilter";
import PersonFilter from "@/components/CampsiteFilter/partials/PersonFilter";
import KitchenFilter from "@/components/CampsiteFilter/partials/KitchenFilter";
import SanitaryFilter from "@/components/CampsiteFilter/partials/SanitaryFilter";
export default {
  name: "CampsiteFilter",
  components: {
    CountyFilter,
    CityFilter,
    PersonFilter,
    KitchenFilter,
    SanitaryFilter,
    FilterReset
  },
  computed: {
    ...mapState(["searchResults", "i18n"])
  }
};
</script>
