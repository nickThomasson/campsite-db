<template>
  <v-col cols="12">
    <h3 class="mb-10">{{ i18n.CAMPSITE_FILTER_TITLE_PERSONS }}</h3>
    <v-range-slider
      v-model="filterValue"
      thumb-label="always"
      :max="filterRange[1]"
      :min="filterRange[0]"
      @end="setPersonFilter()"
    ></v-range-slider>
  </v-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "RangeFilter",
  props: {
    filterRange: Array
  },
  computed: {
    ...mapState(["data", "authentication"]),
    ...mapGetters(["i18n"])
  },
  data() {
    return {
      filterValue: []
    };
  },
  methods: {
    ...mapActions(["applyFilter"]),
    setPersonFilter() {
      this.applyFilter({
        type: "personFilter",
        value: this.filterValue,
        token: this.authentication.token,
        dispatchName: "fetchCampsites"
      });
    }
  },
  mounted() {
    this.filterValue = this.filterRange;
  }
};
</script>
