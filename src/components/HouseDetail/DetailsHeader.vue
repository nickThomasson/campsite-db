<template>
  <v-row>
    <v-col cols="12">
      <span class="overline" data-lang-key="HOUSE_DETAIL_HOUSE_TITLE">
        {{ i18n.HOUSE_DETAIL_HOUSE_TITLE }}
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
