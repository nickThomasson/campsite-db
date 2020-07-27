<template>
  <v-col cols="6">
    <v-card class="mb-4">
      <v-card-title>
        {{ house.name }}
      </v-card-title>
      <v-card-text>
        <v-row>
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
import { mapState } from "vuex";
export default {
  props: {
    house: Object
  },
  methods: {
    price(number) {
      return transformCurrency(number);
    }
  },
  computed: {
    ...mapState(["i18n"])
  }
};
</script>
