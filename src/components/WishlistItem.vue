<template>
  <v-card class="mb-4">
    <v-card-text>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="5"
          md="6"
          lg="4"
          xl="3"
          class="font-weight-black"
          align-self="center"
        >
          <v-icon class="mr-4">{{
            item.type === "house" ? "house" : "filter_vintage"
          }}</v-icon>
          <span @click="goTo(item.id)" class="clickable">{{ item.title }}</span>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="auto" align-self="center"
          >{{ item.county }}, {{ item.street }} {{ item.housenumber }},
          {{ item.zip }} {{ item.city }}</v-col
        >
        <v-spacer></v-spacer>
        <v-col cols="12" sm="3" md="2">
          <v-row class="text-center text-sm-right">
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
    </v-card-text>
  </v-card>
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
        name:
          this.item.type === "campsite"
            ? "CampsiteDetailPage"
            : "HouseDetailPage",
        params: { id }
      });
    }
  }
};
</script>

<style></style>
