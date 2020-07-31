<template>
  <v-col cols="auto">
    <h3>{{ i18n.CAMPSITE_FILTER_TITLE_STATE }}</h3>
    <v-combobox
      v-model="selectedState"
      :items="states"
      :label="i18n.CAMPSITE_FILTER_LABEL_STATE"
      clearable
      @change="setStateFilter(selectedState)"
    ></v-combobox>
  </v-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { find } from "lodash";

export default {
  name: "StateFilter",
  data() {
    return {
      selectedState: null
    };
  },
  computed: {
    ...mapState(["authentication", "data"]),
    ...mapGetters(["states", "i18n", "campsites"]),
    storeValue() {
      const storeValue = find(this.data.activeFilter, {
        filterName: "stateFilter"
      });
      return storeValue !== undefined ? storeValue.rawValue : undefined;
    }
  },
  methods: {
    ...mapActions(["applyFilter"]),
    setStateFilter(value) {
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
