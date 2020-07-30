<template>
  <v-card>
    <v-img
      class="white--text align-end"
      :src="campsite.previewImage.data.thumbnails[2].url"
      height="200px"
      gradient="to top, rgba(1, 57, 109, 0.8), rgba(0, 0, 0, 0.1)"
    >
      <v-card-title>
        {{ campsite.name }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ campsite.address.city }}, {{ campsite.address.state }}
    </v-card-subtitle>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <v-rating
            v-model="campsite.rating"
            readonly
            color="yellow darken-3"
            background-color="grey darken-1"
            class="mb-4 mt-3"
          ></v-rating>
        </v-col>
        <v-col cols="12">
          {{ i18n.CAMPSITE_SEARCH_CARD_PERSON }}
          {{ campsite.persons }}
        </v-col>
        <v-col cols="12">
          {{ i18n.CAMPSITE_SEARCH_CARD_KITCHEN }}
          <v-icon>{{ campsite.kitchen ? "done" : "close" }}</v-icon>
        </v-col>
        <v-col cols="12">
          {{ i18n.CAMPSITE_SEARCH_CARD_SANITARY }}
          <v-icon>
            {{ campsite.sanitary ? "done" : "close" }}
          </v-icon>
        </v-col>
        <v-col cols="12">
          {{ i18n.CAMPSITE_SEARCH_CARD_HOUSE }}
          <v-icon>
            {{ campsite.house ? "done" : "close" }}
          </v-icon>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="goTo(campsite.id)">
        Details
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="addToWishList(campsite)">
        <v-icon :color="heartColor">mdi-heart</v-icon>
      </v-btn>
      <ShareLink :campsiteId="campsite.id" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { transformCurrency } from "@/helper/currency";
import ShareLink from "@/components/CampsiteSearch/ShareLink.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { find, isEmpty } from "lodash";

export default {
  name: "CampsiteOverviewCard",
  props: {
    campsite: Object
  },
  components: {
    ShareLink
  },
  data: () => ({
    rating: 4.5
  }),
  computed: {
    ...mapState(["wishlist"]),
    ...mapGetters(["i18n"]),
    heartColor() {
      const isOnList = find(this.wishlist.wishlist, {
        id: this.campsite.id
      });
      return !isEmpty(isOnList) ? "accent" : "";
    }
  },
  methods: {
    ...mapActions(["addToWishList"]),
    price(number) {
      return transformCurrency(number);
    },
    goTo(id) {
      this.$router.push({
        name: "DetailPage",
        params: { campsiteId: id }
      });
    }
  }
};
</script>
