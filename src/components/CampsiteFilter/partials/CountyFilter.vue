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
    ...mapState(["authentication", "data"]),
    ...mapGetters(["counties", "i18n", "campsites"]),
    storeValue() {
      const storeValue = find(this.data.activeFilter, {
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
        value: this.findCampIdByState(value),
        token: this.authentication.token,
        rawValue: this.selectedCounty
      });
    },
    findCampIdByState(value) {
      const campsiteIds = [];
      if (value) {
        const campsitesFilter = this.campsites.filter(
          item => item.address.county === value
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
      this.selectedCounty = this.storeValue;
    }
  }
};
</script>
