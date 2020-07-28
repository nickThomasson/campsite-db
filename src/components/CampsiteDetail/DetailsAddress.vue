<template>
  <v-card class="mb-4">
    <v-card-title>{{ i18n.CAMPSITE_DETAIL_ADDRESS }}</v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">{{ address.strasse }} {{ address.hausnummer }}</v-col>
        <v-col cols="12">{{ address.plz }} {{ address.stadt }}</v-col>
        <v-col cols="12">{{ address.bundesland }}</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "DetailsAddress",

  computed: {
    ...mapState(["i18n"]),
    ...mapGetters(["mergedPageData"]),
    address() {
      return this.mergedPageData ? this.mergedPageData.address : undefined;
    }
  }
};
</script>
