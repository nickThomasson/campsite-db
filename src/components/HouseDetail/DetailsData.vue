<template>
  <v-card class="mb-4">
    <v-card-title>{{ i18n.HOUSE_DETAIL_PAGE_DATA_TITLE }}</v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12"
          >{{ i18n.HOUSE_DETAIL_PAGE_PRICE }} {{ price(page.price) }}</v-col
        >
        <v-col cols="12"
          >{{ i18n.HOUSE_DETAIL_PAGE_KITCHEN }}
          {{ page.kitchen ? "Ja" : "Nein" }}</v-col
        >
        <v-col cols="12"
          >{{ i18n.HOUSE_DETAIL_PAGE_SANITARY }}
          {{ page.sanitary ? "Ja" : "Nein" }}</v-col
        >
        <v-col cols="12"
          >{{ i18n.HOUSE_DETAIL_PAGE_WIFI }}
          {{ page.wifi ? "Ja" : "Nein" }}</v-col
        >
        <v-col cols="12"
          >{{ i18n.HOUSE_DETAIL_PAGE_ROOMS }} {{ page.rooms }}</v-col
        >
        <v-col cols="12"
          >{{ i18n.HOUSE_DETAIL_PAGE_BEDS }} {{ page.beds }}</v-col
        >
        <v-col cols="12"
          >{{ i18n.HOUSE_DETAIL_PAGE_RECREATIONAL }}
          {{ page.recreationalRoom ? "Ja" : "Nein" }}</v-col
        >
        <v-col cols="12"
          >{{ i18n.HOUSE_DETAIL_PAGE_ADDITIONAL }}
          <ul v-for="(item, index) in page.additionalEquipment" :key="index">
            <li>
              {{ item.Item }}
            </li>
          </ul>
        </v-col>
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
