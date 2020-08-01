<template>
  <v-col :cols="12" :md="houses > 1 ? 6 : 12" v-if="house">
    <v-card class="mb-4">
      <v-card-title @click="goToHouse(house.id)" class="clickable">
        {{ house.name }}
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col v-if="house.beds" cols="12">
            {{ i18n.CAMPSITE_DETAIL_HOUSE_BEDS }} {{ house.beds }}
          </v-col>
          <v-col v-if="house.rooms" cols="12">
            {{ i18n.CAMPSITE_DETAIL_HOUSE_ROOMS }} {{ house.rooms }}
          </v-col>
          <v-col v-if="house.price" cols="12">
            {{ i18n.CAMPSITE_DETAIL_HOUSE_PRICE }} {{ price(house.price) }}
          </v-col>
          <v-col v-if="house.annotations" cols="12">
            {{ i18n.CAMPSITE_DETAIL_HOUSE_INFO }} {{ house.annotations }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { transformCurrency } from "@/helper/currency";
import { mapGetters, mapState } from "vuex";
export default {
  name: "DetailsHouseCard",
  props: {
    house: Object
  },
  methods: {
    price(number) {
      return transformCurrency(number);
    },
    goToHouse(id) {
      this.$router.push({
        name: "HouseDetailPage",
        params: { id }
      });
    }
  },
  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n"]),
    houses() {
      return this.detailPage.page.house.length;
    }
  }
};
</script>
