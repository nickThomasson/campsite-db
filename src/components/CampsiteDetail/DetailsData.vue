<template>
  <v-card class="mb-4">
    <v-card-title data-lang-key="CAMPSITE_DETAIL_PAGE_DATA_TITLE">{{
      i18n.CAMPSITE_DETAIL_PAGE_DATA_TITLE
    }}</v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12" data-lang-key="CAMPSITE_DETAIL_PAGE_PRICE"
          >{{ i18n.CAMPSITE_DETAIL_PAGE_PRICE }} {{ price(page.price) }}</v-col
        >
        <v-col cols="12" data-lang-key="CAMPSITE_DETAIL_PAGE_KITCHEN"
          >{{ i18n.CAMPSITE_DETAIL_PAGE_KITCHEN }}
          {{ page.kitchen ? "Ja" : "Nein" }}</v-col
        >
        <v-col cols="12" data-lang-key="CAMPSITE_DETAIL_PAGE_SANITARY"
          >{{ i18n.CAMPSITE_DETAIL_PAGE_SANITARY }}
          {{ page.sanitary ? "Ja" : "Nein" }}</v-col
        >
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { transformCurrency } from "@/helper/currency";

export default {
  name: "DetailsData",

  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n"]),
    page() {
      return this.detailPage.page;
    }
  },
  methods: {
    price(number) {
      return transformCurrency(number);
    }
  }
};
</script>
