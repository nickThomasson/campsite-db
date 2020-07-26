<template>
  <v-row>
    <v-col class="font-weight-black" align-self="center">
      {{ item.title }}
    </v-col>
    <v-col align-self="center"
      >{{ item.county }}, {{ item.street }} {{ item.housenumber }},
      {{ item.zip }} {{ item.city }}</v-col
    >
    <v-spacer></v-spacer>
    <v-col>
      <v-row class="text-right">
        <v-col cols="12">
          <v-btn color="primary" icon @click="goTo(item.id)" class="mr-4"
            ><v-icon>link</v-icon></v-btn
          >
          <v-btn color="primary" icon @click="deleteFromWishlist(item.id)"
            ><v-icon>delete</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "WishlistItem",
  props: {
    item: Object
  },
  methods: {
    ...mapActions(["deleteFromWishlist"]),
    goTo(id) {
      this.$router.push({
        name: "DetailPage",
        params: { campsiteId: id }
      });
    }
  }
};
</script>

<style></style>
