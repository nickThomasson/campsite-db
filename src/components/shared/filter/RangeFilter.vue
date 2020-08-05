<template>
  <div>
    <h3 class="mb-10">{{ filterTitle }}</h3>
    <v-range-slider
      v-model="filterValue"
      thumb-label="always"
      :max="filterRange[1]"
      :min="filterRange[0]"
      @end="setPersonFilter()"
    ></v-range-slider>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "RangeFilter",
  props: {
    filterRange: Array,
    filterTitle: String,
    dispatchName: String,
    filterName: String
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
        type: this.filterName,
        value: this.filterValue,
        token: this.authentication.token,
        dispatchName: this.dispatchName,
        rawValue: this.filterValue
      });
    }
  },
  mounted() {
    this.filterValue = this.filterRange;
  }
};
</script>
