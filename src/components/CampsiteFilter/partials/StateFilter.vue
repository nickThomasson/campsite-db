<template>
  <v-col cols="auto">
    <h3>{{ i18n.CAMPSITE_FILTER_TITLE_COUNTY }}</h3>
    <v-combobox
      v-model="selectedState"
      :items="states"
      :label="i18n.CAMPSITE_FILTER_LABEL_COUNTY"
      clearable
      @change="setCountyFilter(selectedState)"
    ></v-combobox>
  </v-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { find } from "lodash";

export default {
  name: "CountyFilter",
  data() {
    return {
      selectedState: null
    };
  },
  computed: {
    ...mapState(["authentication", "searchResults"]),
    ...mapGetters(["states", "i18n", "campsites"]),
    storeValue() {
      const storeValue = find(this.searchResults.activeFilter, {
        filterName: "stateFilter"
      });
      return storeValue !== undefined ? storeValue.rawValue : undefined;
    }
  },
  methods: {
    ...mapActions(["applyFilter"]),
    setCountyFilter(value) {
      this.applyFilter({
        type: "stateFilter",
        value: this.findCampIdByState(value),
        token: this.authentication.token,
        rawValue: this.selectedState
      });
    },
    findCampIdByState(value) {
      const campsiteIds = [];
      if (value) {
        const campsitesFilter = this.campsites.filter(
          item => item.address.state === value
        );
        for (const campsite of campsitesFilter) {
          campsiteIds.push(campsite.id);
        }
      }
      return campsiteIds.join(",");
    }
  },
  mounted() {
    if (this.storeValue) {
      this.selectedState = this.storeValue;
    }
  }
};
</script>
