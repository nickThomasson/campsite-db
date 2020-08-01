<template>
  <v-col :cols="12" :md="campsites > 1 ? 6 : 12" v-if="campsite">
    <v-card class="mb-4">
      <v-card-title @click="goToCampsite(campsite.id)" class="clickable">
        {{ campsite.name }}
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col
            v-if="campsite.persons"
            cols="12"
            data-lang-key="HOUSE_DETAIL_CAMPSITE_PERSONS"
          >
            {{ i18n.HOUSE_DETAIL_CAMPSITE_PERSONS }} {{ campsite.persons }}
          </v-col>
          <v-col
            v-if="campsite.price"
            cols="12"
            data-lang-key="HOUSE_DETAIL_CAMPSITE_PRICE"
          >
            {{ i18n.HOUSE_DETAIL_CAMPSITE_PRICE }} {{ price(campsite.price) }}
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
  name: "DetailsCampsiteCard",
  props: {
    campsite: Object
  },
  methods: {
    price(number) {
      return transformCurrency(number);
    },
    goToCampsite(id) {
      this.$router.push({
        name: "CampsiteDetailPage",
        params: { id }
      });
    }
  },
  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n"]),
    campsites() {
      return this.detailPage.page.campsites.length;
    }
  }
};
</script>
