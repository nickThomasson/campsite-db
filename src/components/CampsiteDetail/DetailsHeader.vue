<template>
  <v-row>
    <v-col cols="12">
      <span class="overline" data-lang-key="CAMPSITE_DETAIL_INFO_TITLE">
        {{ i18n.CAMPSITE_DETAIL_INFO_TITLE }}
      </span>
      <h1>{{ page.name }}</h1>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "DetailsHeader",
  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n"]),
    page() {
      return this.detailPage.page;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
