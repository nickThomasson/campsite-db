<template>
  <v-col cols="12">
    <h3>{{ i18n.CAMPSITE_FILTER_TITLE_CITY }}</h3>
    <v-combobox
      v-model="selectedCity"
      :items="cities"
      :label="i18n.CAMPSITE_FILTER_LABEL_CITY"
      clearable
      @change="setCityFilter(selectedCity)"
    ></v-combobox>
  </v-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { find } from "lodash";

export default {
  name: "CityFilter",
  data() {
    return {
      selectedCity: null
    };
  },
  computed: {
    ...mapState(["authentication", "searchResults"]),
    ...mapGetters(["cities", "i18n", "campsites"]),
    storeValue() {
      const storeValue = find(this.searchResults.activeFilter, {
        filterName: "cityFilter"
      });
      return storeValue !== undefined ? storeValue.rawValue : undefined;
    }
  },
  methods: {
    ...mapActions(["applyFilter"]),
    setCityFilter(value) {
      this.applyFilter({
        type: "cityFilter",
        value: this.findCampIdByCity(value),
        token: this.authentication.token,
        rawValue: this.selectedCity
      });
    },
    findCampIdByCity(value) {
      const campsiteIds = [];
      if (value) {
        const campsitesFilter = this.campsites.filter(
          item => item.address.city === value
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
      this.selectedCity = this.storeValue;
    }
  }
};
</script>
