<template>
  <v-card>
    <v-img
      class="white--text align-end"
      :src="result.campsite.vorschaubild.data.thumbnails[2].url"
      height="200px"
      gradient="to top, rgba(1, 57, 109, 0.8), rgba(0, 0, 0, 0.1)"
    >
      <v-card-title>
        {{ result.campsite.name }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ result.address.stadt }}, {{ result.address.bundesland }}
    </v-card-subtitle>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <v-rating
            v-model="result.campsite.bewertung"
            readonly
            color="yellow darken-3"
            background-color="grey darken-1"
            class="mb-4 mt-3"
          ></v-rating>
        </v-col>
        <v-col cols="12">
          {{ i18n.CAMPSITE_SEARCH_CARD_PERSON }}
          {{ result.campsite.personen }}
        </v-col>
        <v-col cols="12">
          {{ i18n.CAMPSITE_SEARCH_CARD_KITCHEN }}
          <v-icon>{{ result.campsite.kueche ? "done" : "close" }}</v-icon>
        </v-col>
        <v-col cols="12">
          {{ i18n.CAMPSITE_SEARCH_CARD_SANITARY }}
          <v-icon>
            {{ result.campsite.sanitaeranlagen ? "done" : "close" }}
          </v-icon>
        </v-col>
        <v-col cols="12">
          {{ i18n.CAMPSITE_SEARCH_CARD_HOUSE }}
          <v-icon>
            {{ result.house ? "done" : "close" }}
          </v-icon>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="goTo(result.campsite.id)">
        Details
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="addToWishList(result)">
        <v-icon :color="heartColor">mdi-heart</v-icon>
      </v-btn>
      <ShareLink :campsiteId="result.campsite.id" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { transformCurrency } from "@/helper/currency";
import ShareLink from "@/components/CampsiteSearch/ShareLink.vue";
import { mapActions, mapState } from "vuex";
import { find, isEmpty } from "lodash";

export default {
  name: "CampsiteOverviewCard",
  props: {
    result: Object
  },
  components: {
    ShareLink
  },
  data: () => ({
    rating: 4.5
  }),
  computed: {
    ...mapState(["wishlist", "i18n"]),
    heartColor() {
      const isOnList = find(this.wishlist.wishlist, {
        id: this.result.campsite.id
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
