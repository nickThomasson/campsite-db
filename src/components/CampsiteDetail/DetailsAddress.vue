<template>
  <v-card class="mb-4">
    <v-card-title>{{ i18n.CAMPSITE_DETAIL_ADDRESS }}</v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">{{ address.strasse }} {{ address.hausnummer }}</v-col>
        <v-col cols="12">{{ address.plz }} {{ address.stadt }}</v-col>
        <v-col v-if="address.landkreis" cols="12">{{
          address.landkreis
        }}</v-col>
        <v-col v-if="address.bundesland" cols="12">{{
          address.bundesland
        }}</v-col>
        <v-col v-if="address.telefon" cols="12"
          >{{ i18n.CAMPSITE_DETAIL_ADDRESS_PHONE }} {{ address.telefon }}</v-col
        >
        <v-col v-if="address.fax" cols="12"
          >{{ i18n.CAMPSITE_DETAIL_ADDRESS_FAX }} {{ address.fax }}</v-col
        >
        <v-col v-if="address.website" cols="12" class="mt-4">
          <a :href="address.website" target="_blank" class="mr-2">
            <v-icon>home</v-icon>
          </a>
          <a
            v-if="address.email"
            :href="`mailto:${address.email}`"
            target="_blank"
            class="mr-2"
          >
            <v-icon>mail</v-icon>
          </a>
          <a
            :href="
              `https://www.google.de/maps/place/${address.strasse}+${address.hausnummer}+${address.plz}+${address.stadt}`
            "
            target="_blank"
          >
            <v-icon>location_on</v-icon>
          </a>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DetailsAddress",

  computed: {
    ...mapGetters(["mergedPageData", "i18n"]),
    address() {
      return this.mergedPageData ? this.mergedPageData.address : undefined;
    }
  }
};
</script>
