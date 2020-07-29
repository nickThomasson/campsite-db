<template>
  <v-card class="mb-4">
    <v-card-title>{{ i18n.CAMPSITE_DETAIL_INFO_DATA_TITLE }}</v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12"
          >{{ i18n.CAMPSITE_DETAIL_HOUSE_PRICE }} {{ price(page.preis) }}</v-col
        >
        <v-col cols="12"
          >{{ i18n.CAMPSITE_DETAIL_INFO_KITCHEN }}
          {{ page.kueche ? "Ja" : "Nein" }}</v-col
        >
        <v-col cols="12"
          >{{ i18n.CAMPSITE_DETAIL_INFO_SANITARY }}
          {{ page.sanitaeranlagen ? "Ja" : "Nein" }}</v-col
        >
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { transformCurrency } from "@/helper/currency";

export default {
  name: "DetailsData",

  computed: {
    ...mapGetters(["mergedPageData", "i18n"]),
    page() {
      return this.mergedPageData ? this.mergedPageData.campsite : undefined;
    }
  },
  methods: {
    price(number) {
      return transformCurrency(number);
    }
  }
};
</script>
