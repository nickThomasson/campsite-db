<template>
  <v-row no-gutters class="body-1">
    <v-col cols="12"
      >{{ address.street }} {{ address.houseNumber }}
      <span v-if="address.type" class="text--disabled caption"
        >({{ address.type }})</span
      ></v-col
    >
    <v-col cols="12">{{ address.zip }} {{ address.city }}</v-col>
    <v-col v-if="address.landkreis" cols="12">{{ address.county }}</v-col>
    <v-col class="mb-2" v-if="address.state" cols="12">{{
      address.state
    }}</v-col>

    <v-col cols="12" if="address.phone">
      <v-row no-gutters>
        <v-col
          cols="auto"
          :aria-label="i18n.APP_DETAIL_ADDRESS_PHONE"
          class="mr-2"
          align-self="center"
        >
          <v-icon small>phone</v-icon>
        </v-col>
        <v-col cols="auto" class="mr-2 text--disabled">
          {{ i18n.APP_DETAIL_ADDRESS_PHONE }}
        </v-col>
        <v-col
          v-if="address.phone"
          cols="auto"
          data-lang-key="APP_DETAIL_ADDRESS_PHONE"
          align-self="center"
        >
          {{ address.phone }}
        </v-col>
      </v-row>

      <v-row no-gutters if="address.fax">
        <v-col
          cols="auto"
          :aria-label="i18n.APP_DETAIL_ADDRESS_FAX"
          class="mr-2"
          align-self="center"
        >
          <v-icon small>settings_phone</v-icon>
        </v-col>
        <v-col cols="auto" class="mr-2 text--disabled">
          {{ i18n.APP_DETAIL_ADDRESS_FAX }}
        </v-col>
        <v-col
          v-if="address.fax"
          cols="auto"
          data-lang-key="APP_DETAIL_ADDRESS_FAX"
          align-self="center"
        >
          {{ address.fax }}
        </v-col>
      </v-row>
    </v-col>

    <v-col v-if="address.website" cols="12" class="mt-4">
      <a
        :href="website ? website : address.website"
        target="_blank"
        class="mr-2"
        :title="i18n.APP_DETAIL_ADDRESS_WEBSITE_LINK_TITLE"
      >
        <v-icon>home</v-icon>
      </a>
      <a
        v-if="address.email"
        :href="`mailto:${address.email}`"
        target="_blank"
        class="mr-2"
        :title="i18n.APP_DETAIL_ADDRESS_MAIL_LINK_TITLE"
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

    <v-divider v-if="!lastItem" class="my-6" inset></v-divider>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "AddressItem",
  props: {
    address: Object,
    index: Number,
    total: Number
  },
  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n"]),
    website() {
      return this.detailPage.page.website;
    },
    mapsService() {
      if (process.env.VUE_APP_GOOGLE_MAPS_KEY) {
        return "https://www.google.de/maps/place/";
      }
      switch (process.env.VUE_APP_MAP) {
        case "bm":
          return "https://www.bing.com/maps?ss=";
        case "gm":
          return "https://www.google.de/maps/place/";
        default:
          return "https://www.openstreetmap.org/search?query=";
      }
    },
    lastItem() {
      return this.total === this.index + 1;
    }
  }
};
</script>
<style lang="scss" scopted>
hr.divider {
  border: none;
  height: 1px !important;
  background-color: gray;
}
</style>
