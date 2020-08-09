<template>
  <v-card class="mb-4" v-if="detailPage.page.address.length > 0">
    <Maps
      :address="{
        street: primaryAddress.street,
        houseNumber: primaryAddress.houseNumber,
        zip: primaryAddress.zip,
        city: primaryAddress.city
      }"
    />
    <v-card-text>
      <AddressItem
        :address="primaryAddress"
        :index="secondaryAddresses.length > 0 ? 1 : 0"
        :total="1"
      />
      <AddressItem
        :address="address"
        v-for="(address, index) in secondaryAddresses"
        :key="index"
        :index="index"
        :total="secondaryAddresses.length"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Maps from "@/components/shared/details/partial/maps";
import AddressItem from "@/components/shared/details/partial/AddressItem";
import { find } from "lodash";

export default {
  name: "DetailsAddress",
  components: {
    Maps,
    AddressItem
  },
  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n"]),
    primaryAddress() {
      const addresses = this.detailPage.page.address;
      const mainAddress = find(addresses, { mainAddress: true });
      return mainAddress ? mainAddress : addresses[0];
    },
    secondaryAddresses() {
      return this.detailPage.page.address.filter(item => !item.mainAddress);
    },
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
    }
  }
};
</script>
