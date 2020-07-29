<template>
  <v-container class="mt-8">
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
</template>

<script>
import WishlistItem from "@/components/WishlistItem.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import { Status } from "@/helper/status";
export default {
  name: "Wishlist",
  components: {
    WishlistItem
  },
  computed: {
    ...mapState(["wishlist", "app"]),
    ...mapGetters(["i18n"]),
    status() {
      return Status;
    }
  },
  methods: {
    ...mapActions(["setActivePage"])
  },
  updated() {
    this.setActivePage(this.i18n.CAMPSITE_WISHLIST_TITLE);
  },
  mounted() {
    this.setActivePage(this.i18n.CAMPSITE_WISHLIST_TITLE);
  }
};
</script>
