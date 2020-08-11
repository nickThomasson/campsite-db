<template>
  <v-card class="mb-4">
    <Maps />
    <v-card-text>
      <AddressItem
        :address="primaryAddress"
        mainAddress
        :index="secondaryAddresses.length > 0 ? 1 : 0"
        :total="1"
      />
      <div v-if="detailPage.page.address.length > 0">
        <AddressItem
          :address="address"
          v-for="(address, index) in secondaryAddresses"
          :key="index"
          :index="index"
          :total="secondaryAddresses.length"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Maps from "@/components/shared/details/partial/Maps.vue";
import AddressItem from "@/components/shared/details/partial/AddressItem.vue";

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
      return this.detailPage.page.mainAddress;
    },
    secondaryAddresses() {
      return this.detailPage.page.address;
    }
  }
};
</script>
