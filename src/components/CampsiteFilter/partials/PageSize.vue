<template>
  <v-select
    v-model="limit"
    :items="[10, 20, 50, 100]"
    :label="i18n.CAMPSITE_FILTER_LABEL_PAGE_SIZE"
  ></v-select>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "PageSize",
  computed: {
    ...mapState(["searchResults", "authentication"]),
    ...mapGetters(["i18n"]),
    limit: {
      get() {
        return this.searchResults.limit;
      },
      set(value) {
        this.applyPageLimit({ value, token: this.authentication.token });
      }
    }
  },
  methods: {
    ...mapActions(["applyPageLimit"])
  }
};
</script>

<style></style>
