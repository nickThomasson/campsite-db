<template>
  <v-switch
    v-model="filterValue"
    :label="filterLabel"
    @change="setSanitaryFilter(filterValue)"
  ></v-switch>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { find } from "lodash";

export default {
  name: "SwitchFilter",
  props: {
    filterLabel: String,
    filterName: String,
    dispatchName: String
  },
  data() {
    return {
      filterValue: false
    };
  },
  computed: {
    ...mapState(["authentication", "data"]),
    ...mapGetters(["i18n"]),
    storeValue() {
      const storeValue = find(this.data.activeFilter, {
        filterName: this.filterName
      });
      return storeValue;
    }
  },
  methods: {
    ...mapActions(["applyFilter"]),
    setSanitaryFilter(value) {
      this.applyFilter({
        type: this.filterName,
        value,
        token: this.authentication.token,
        dispatchName: this.dispatchName
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
