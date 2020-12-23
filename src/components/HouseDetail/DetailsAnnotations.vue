<template>
  <v-card class="mt-4" v-if="page.annotations">
    <v-card-title>
      {{ i18n.CAMPSITE_DETAIL_HOUSE_INFO }}
    </v-card-title>
    <v-card-text v-html="page.annotations"> </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "DetailsAnnotation",
  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n"]),
    page() {
      return this.detailPage.page;
    }
  }
};
</script>
