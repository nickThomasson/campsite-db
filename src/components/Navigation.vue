<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{
          i18n.CAMPSITE_NAVIGATION_TITLE
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item link @click="startpage">
        <v-list-item-icon>
          <v-icon>dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{
            i18n.CAMPSITE_SEARCH_TITLE
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="houseSearch">
        <v-list-item-icon>
          <v-icon>house</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{
            i18n.CAMPSITE_NAVIGATION_HOUSE_SEARCH
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="wishlist">
        <v-list-item-icon>
          <v-icon>list_alt</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ i18n.CAMPSITE_NAVIGATION_WISHLIST }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navigation",
  computed: {
    ...mapGetters(["i18n"])
  },
  data() {
    return {
      drawer: null
    };
  },
  methods: {
    startpage() {
      this.$router
        .push({
          name: "CampsiteSearch"
        })
        .catch(() => {
          console.log("Gleiche Seite ;-)");
        });
    },
    houseSearch() {
      this.$router
        .push({
          name: "HouseSearch"
        })
        .catch(() => {
          console.log("Gleiche Seite ;-)");
        });
    },
    wishlist() {
      this.$router
        .push({
          name: "Wishlist"
        })
        .catch(() => {
          console.log("Gleiche Seite ;-)");
        });
    }
  }
};
</script>
