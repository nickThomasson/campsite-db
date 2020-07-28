<template>
  <v-app>
    <Header :pageTitle="i18n.CAMPSITE_WISHLIST_TITLE" />
    <v-container>
      <WishlistItem
        v-for="(item, index) of wishlist.wishlist"
        :key="index"
        :item="item"
      />
      <v-card>
        <v-card-text v-if="wishlist.wishlist.length === 0" class="text-center">
          <h2 class="mt-6 mb-6">
            Es befinden sich keine Zeltplätze auf deinem Merkzettel
          </h2>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";
import WishlistItem from "@/components/WishlistItem.vue";
import { mapState } from "vuex";
export default {
  name: "Wishlist",
  components: {
    Header,
    WishlistItem
  },
  computed: {
    ...mapState(["wishlist", "i18n"])
  }
};
</script>
