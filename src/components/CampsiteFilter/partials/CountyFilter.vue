<template>
  <v-col cols="auto">
    <h3>{{ i18n.CAMPSITE_FILTER_TITLE_COUNTY }}</h3>
    <v-combobox
      v-model="selectedCounty"
      :items="counties"
      :label="i18n.CAMPSITE_FILTER_LABEL_COUNTY"
      clearable
      @change="setCountyFilter(selectedCounty)"
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
      selectedCounty: null
    };
  },
  computed: {
    ...mapState(["authentication", "searchResults"]),
    ...mapGetters(["counties", "mergedResults", "i18n"]),
    storeValue() {
      const storeValue = find(this.searchResults.activeFilter, {
        filterName: "countyFilter"
      });
      return storeValue !== undefined ? storeValue.rawValue : undefined;
    }
  },
  methods: {
    ...mapActions(["applyFilter"]),
    setCountyFilter(value) {
      this.applyFilter({
        type: "countyFilter",
        value: this.findCampIdByCounty(value),
        token: this.authentication.token,
        rawValue: this.selectedCounty
      });
    },
    findCampIdByCounty(value) {
      const campsiteIds = [];
      if (value) {
        const campsites = this.mergedResults.filter(
          campsite => campsite["address"]["bundesland"] === value
        );
        for (const campsite of campsites) {
          campsiteIds.push(campsite.campsite.id);
        }
      }
      return campsiteIds.join(",");
    }
  },
  mounted() {
    if (this.storeValue) {
      this.selectedCounty = this.storeValue;
    }
  }
};
</script>
