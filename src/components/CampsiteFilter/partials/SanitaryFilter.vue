<template>
  <v-switch
    v-model="filterValue"
    :label="i18n.CAMPSITE_FILTER_LABEL_SANITARY"
    @change="setSanitaryFilter(filterValue)"
  ></v-switch>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { find } from "lodash";

export default {
  name: "SanitaryFilter",
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
        filterName: "sanitaryFilter"
      });
      return storeValue;
    }
  },
  methods: {
    ...mapActions(["applyFilter"]),
    setSanitaryFilter(value) {
      this.applyFilter({
        type: "sanitaryFilter",
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
