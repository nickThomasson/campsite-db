<template>
  <v-col cols="auto">
    <h3>{{ filterTitle }}</h3>
    <v-combobox
      v-model="selectedState"
      :items="selectItems"
      :label="filterLabel"
      clearable
      @change="setFilter(selectedState)"
    ></v-combobox>
  </v-col>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { find } from "lodash";

export default {
  name: "StateFilter",
  data() {
    return {
      selectedState: null
    };
  },
  props: {
    filterName: String,
    selectItems: Array,
    sourceData: Array,
    filterLabel: String,
    filterTitle: String,
    dispatchName: String
  },
  computed: {
    ...mapState(["authentication", "data"]),
    storeValue() {
      const storeValue = find(this.data.activeFilter, {
        filterName: this.filterName
      });
      return storeValue !== undefined ? storeValue.rawValue : undefined;
    },
    searchKey() {
      switch (this.filterName) {
        case "stateFilter":
          return "state";
        case "countyFilter":
          return "county";
        case "cityFilter":
          return "city";
        default:
          return console.error(
            "Missing option: 'stateFilter', 'countyFilter', 'cityFilter' "
          );
      }
    }
  },
  methods: {
    ...mapActions(["applyFilter"]),
    setFilter(value) {
      this.applyFilter({
        type: this.filterName,
        value: this.findItemId(value),
        token: this.authentication.token,
        rawValue: this.selectedState,
        dispatchName: this.dispatchName
      });
    },
    findItemId(value) {
      const Ids = [];
      const key = this.searchKey;
      if (value) {
        const filter = this.sourceData.filter(
          item => item.address[key] === value
        );
        for (const item of filter) {
          Ids.push(item.id);
        }
      }
      return Ids.join(",");
    }
  },
  mounted() {
    if (this.storeValue) {
      this.select = this.storeValue;
    }
  }
};
</script>
