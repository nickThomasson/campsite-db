<template>
  <v-col cols="12">
    <v-range-slider
      v-model="persons"
      thumb-label="always"
      :max="personCount[1]"
      :min="personCount[0]"
      @end="setPersonFilter(searchResults.personFilter)"
    ></v-range-slider>
  </v-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "PersonFilter",
  computed: {
    ...mapState(["searchResults", "authentication"]),
    ...mapGetters(["personCount", "i18n"]),
    persons: {
      get() {
        return this.personCount;
      },
      set(value) {
        this.$store.commit("SET_PERSON_COUNT", value);
      }
    }
  },
  methods: {
    ...mapActions(["applyFilter"]),
    setPersonFilter(value) {
      this.applyFilter({
        type: "personFilter",
        value,
        token: this.authentication.token
      });
    }
  }
};
</script>
