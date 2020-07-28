<template>
  <v-col :cols="12" :md="houses > 1 ? 6 : 12">
    <v-card class="mb-4">
      <v-card-title> {{ house.name }} </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col v-if="house.betten" cols="12">
            {{ i18n.CAMPSITE_DETAIL_HOUSE_BEDS }} {{ house.betten }}
          </v-col>
          <v-col v-if="house.seminarraeume" cols="12">
            {{ i18n.CAMPSITE_DETAIL_HOUSE_ROOMS }} {{ house.seminarraeume }}
          </v-col>
          <v-col v-if="house.preis" cols="12">
            {{ i18n.CAMPSITE_DETAIL_HOUSE_PRICE }} {{ price(house.preis) }}
          </v-col>
          <v-col v-if="house.bemerkungen" cols="12">
            {{ i18n.CAMPSITE_DETAIL_HOUSE_INFO }} {{ house.bemerkungen }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { transformCurrency } from "@/helper/currency";
import { mapState, mapGetters } from "vuex";
export default {
  name: "DetailsHouseCard",
  props: {
    house: Object
  },
  methods: {
    price(number) {
      return transformCurrency(number);
    }
  },
  computed: {
    ...mapState(["i18n"]),
    ...mapGetters(["mergedPageData"]),
    houses() {
      return this.mergedPageData.house.length;
    }
  }
};
</script>
