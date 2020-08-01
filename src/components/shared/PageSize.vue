<template>
  <v-select
    data-lang-key="APP_FILTER_LABEL_PAGE_SIZE"
    v-model="limit"
    :items="[10, 20, 50, 100]"
    :label="i18n.APP_FILTER_LABEL_PAGE_SIZE"
  ></v-select>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "PageSize",
  props: {
    dispatchName: String
  },
  computed: {
    ...mapState(["data", "authentication"]),
    ...mapGetters(["i18n"]),
    limit: {
      get() {
        return this.data.limit;
      },
      set(value) {
        this.applyPageLimit({
          value,
          token: this.authentication.token,
          dispatchName: this.dispatchName
        });
      }
    }
  },
  methods: {
    ...mapActions(["applyPageLimit"])
  }
};
</script>

<style></style>
