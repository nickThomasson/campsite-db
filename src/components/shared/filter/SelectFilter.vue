<template>
  <v-col cols="12">
    <h3>{{ filterTitle }}</h3>
    <v-combobox
      v-model="selectedState"
      :items="selectItems"
      :label="filterLabel"
      clearable
      :disabled="filterDisabled"
      @change="setFilter(selectedState)"
    ></v-combobox>
  </v-col>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { find } from "lodash";

export default {
  name: "SelectFilter",
  data() {
    return {
      selectedState: null,
      filterSet: false,
      filterDisabled: false
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
    ...mapActions(["applyFilter", "applyReset"]),
    setFilter(value) {
      this.applyFilter({
        type: this.filterName,
        value: this.findItemId(value),
        token: this.authentication.token,
        rawValue: this.selectedState,
        dispatchName: this.dispatchName
      });
      if (this.selectedState) {
        this.filterSet = true;
      } else {
        this.filterSet = false;
      }
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
    },
    singleSelection() {
      if (this.selectItems.length === 1 && !this.filterSet) {
        this.selectedState = this.selectItems;
        this.filterDisabled = true;
      }
      if (this.selectItems.length !== 1 && !this.filterSet) {
        this.selectedState = null;
        this.filterDisabled = false;
      }
    }
  },
  mounted() {
    if (this.storeValue) {
      this.select = this.storeValue;
    }
  },
  updated() {
    this.singleSelection();
  }
};
</script>
