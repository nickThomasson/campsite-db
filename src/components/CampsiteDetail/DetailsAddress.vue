<template>
  <v-card class="mb-4" v-if="address">
    <v-card-title>{{ i18n.CAMPSITE_DETAIL_ADDRESS }}</v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">{{ address.street }} {{ address.houseNumber }}</v-col>
        <v-col cols="12">{{ address.zip }} {{ address.city }}</v-col>
        <v-col v-if="address.landkreis" cols="12">{{ address.county }}</v-col>
        <v-col v-if="address.state" cols="12">{{ address.state }}</v-col>
        <v-col v-if="address.phone" cols="12"
          >{{ i18n.CAMPSITE_DETAIL_ADDRESS_PHONE }} {{ address.phone }}</v-col
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
              `https://www.google.de/maps/place/${address.street}+${address.houseNumnber}+${address.zip}+${address.city}`
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
import { mapGetters, mapState } from "vuex";

export default {
  name: "DetailsAddress",

  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n"]),
    address() {
      return this.detailPage.page.address;
    }
  }
};
</script>
