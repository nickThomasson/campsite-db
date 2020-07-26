<template>
  <v-switch
    v-model="filterValue"
    :label="i18n.CAMPSITE_FILTER_LABEL_KITCHEN"
    @change="setKitchenFilter(filterValue)"
  ></v-switch>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { find } from "lodash";

export default {
  name: "KitchenFilter",
  data() {
    return {
      filterValue: false
    };
  },
  computed: {
    ...mapState(["authentication", "searchResults", "i18n"]),
    storeValue() {
      const storeValue = find(this.searchResults.activeFilter, {
        filterName: "kitchenFilter"
      });
      return storeValue;
    }
  },
  methods: {
    ...mapActions(["applyFilter"]),
    setKitchenFilter(value) {
      this.applyFilter({
        type: "kitchenFilter",
        value,
        token: this.authentication.token
      });
    }
  },
  mounted() {
    if (this.storeValue) {
      this.filterValue = true;
    }
  }
};
</script>
