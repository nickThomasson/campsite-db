<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <Navigation />
    </v-navigation-drawer>
    <v-card tile>
      <v-toolbar dark color="primary">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>{{ i18n.CAMPSITE_SEARCH_TITLE }} </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-badge
          color="accent"
          :content="wishlist.wishlist.length"
          overlap
          class="mr-6"
          :value="wishlist.wishlist.length > 0"
        >
          <v-icon @click="wishlistNav">list_alt</v-icon>
        </v-badge>

        <v-img
          :src="logo"
          :max-width="35"
          :max-height="35"
          contain
          :alt="i18n.CAMPSITE_SEARCH_TITLE"
        ></v-img>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Navigation from "@/components/Navigation.vue";
import logo from "@/assets/logo.svg";

export default {
  name: "Header",
  components: {
    Navigation
  },
  data() {
    return {
      drawer: null
    };
  },
  computed: {
    ...mapState(["i18n", "wishlist"]),
    logo() {
      return logo;
    }
  },
  methods: {
    wishlistNav() {
      this.$router.push({
        name: "Wishlist"
      });
    }
  }
};
</script>
