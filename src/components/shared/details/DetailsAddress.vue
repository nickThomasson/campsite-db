<template>
  <v-card class="mb-4" v-if="address">
    <v-card-title data-lang-key="APP_DETAIL_ADDRESS">
      {{ i18n.APP_DETAIL_ADDRESS }}
    </v-card-title>
    <v-card-subtitle v-if="address.type">({{ address.type }})</v-card-subtitle>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">{{ address.street }} {{ address.houseNumber }}</v-col>
        <v-col cols="12">{{ address.zip }} {{ address.city }}</v-col>
        <v-col v-if="address.landkreis" cols="12">{{ address.county }}</v-col>
        <v-col v-if="address.state" cols="12">{{ address.state }}</v-col>
        <v-col
          v-if="address.phone"
          cols="12"
          data-lang-key="APP_DETAIL_ADDRESS_PHONE"
          >{{ i18n.APP_DETAIL_ADDRESS_PHONE }} {{ address.phone }}</v-col
        >
        <v-col
          v-if="address.fax"
          cols="12"
          data-lang-key="APP_DETAIL_ADDRESS_FAX"
          >{{ i18n.APP_DETAIL_ADDRESS_FAX }} {{ address.fax }}</v-col
        >
        <v-col v-if="address.website" cols="12" class="mt-4">
          <a
            :href="website ? website : address.website"
            target="_blank"
            class="mr-2"
            :title="address.website"
          >
            <v-icon>home</v-icon>
          </a>
          <a
            v-if="address.email"
            :href="`mailto:${address.email}`"
            target="_blank"
            class="mr-2"
            :title="address.email"
          >
            <v-icon>mail</v-icon>
          </a>
          <a
            :href="
              `${mapsService}${address.street}+${address.houseNumber}+${address.zip}+${address.city}`
            "
            target="_blank"
            :title="i18n.APP_DETAIL_ADDRESS_MAPS_LINK_TITLE"
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
    },
    website() {
      return this.detailPage.page.website;
    },
    mapsService() {
      switch (process.env.VUE_APP_MAP) {
        case "bm":
          return "https://www.bing.com/maps?ss=";
        case "gm":
          return "https://www.google.de/maps/place/";
        default:
          return "https://www.openstreetmap.org/search?query=";
      }
    }
  }
};
</script>
