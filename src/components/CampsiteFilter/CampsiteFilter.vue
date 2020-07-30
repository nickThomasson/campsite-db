<template>
  <div>
    <StateFilter />
    <CountyFilter />
    <CityFilter />
    <PersonFilter />
    <h3>{{ i18n.CAMPSITE_FILTER_TITLE_SPECS }}</h3>
    <KitchenFilter />
    <SanitaryFilter />
    <FilterReset :key="app.resetKey" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import FilterReset from "@/components/CampsiteFilter/partials/FilterReset.vue";
import StateFilter from "@/components/CampsiteFilter/partials/StateFilter";
import CountyFilter from "@/components/CampsiteFilter/partials/CountyFilter.vue";
import CityFilter from "@/components/CampsiteFilter/partials/CityFilter";
import PersonFilter from "@/components/CampsiteFilter/partials/PersonFilter";
import KitchenFilter from "@/components/CampsiteFilter/partials/KitchenFilter";
import SanitaryFilter from "@/components/CampsiteFilter/partials/SanitaryFilter";
export default {
  name: "CampsiteFilter",
  components: {
    StateFilter,
    CountyFilter,
    CityFilter,
    PersonFilter,
    KitchenFilter,
    SanitaryFilter,
    FilterReset
  },
  computed: {
    ...mapState(["app"]),
    ...mapGetters(["i18n"])
  }
};
</script>
