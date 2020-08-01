<template>
  <v-card>
    <v-img
      class="white--text align-end"
      :src="
        house.previewImage
          ? house.previewImage.data.thumbnails[2].url
          : placeholderImg
      "
      height="200px"
      gradient="to top, rgba(1, 57, 109, 0.8), rgba(0, 0, 0, 0.1)"
      :alt="house.name"
    >
      <v-card-title>
        {{ house.name }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ house.address.city }}, {{ house.address.state }}
    </v-card-subtitle>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <v-rating
            v-model="house.rating"
            readonly
            color="yellow darken-3"
            background-color="grey darken-1"
            class="mb-4 mt-3"
          ></v-rating>
        </v-col>
        <v-col cols="12" data-lang-key="HOUSE_SEARCH_CARD_BEDS">
          {{ i18n.HOUSE_SEARCH_CARD_BEDS }}
          {{ house.beds ? house.beds : i18n.APP_NO_VALUE }}
        </v-col>
        <v-col cols="12" data-lang-key="HOUSE_SEARCH_CARD_ROOMS">
          {{ i18n.HOUSE_SEARCH_CARD_ROOMS }}
          {{ house.rooms ? house.rooms : i18n.APP_NO_VALUE }}
        </v-col>
        <v-col cols="12" data-lang-key="HOUSE_SEARCH_CARD_KITCHEN">
          {{ i18n.HOUSE_SEARCH_CARD_KITCHEN }}
          <v-icon>
            {{ house.kitchen ? "done" : "close" }}
          </v-icon>
        </v-col>
        <v-col cols="12" data-lang-key="HOUSE_SEARCH_CARD_SANITARY">
          {{ i18n.HOUSE_SEARCH_CARD_SANITARY }}
          <v-icon>
            {{ house.sanitary ? "done" : "close" }}
          </v-icon>
        </v-col>
        <v-col cols="12" data-lang-key="HOUSE_SEARCH_CARD_WIFI">
          {{ i18n.HOUSE_SEARCH_CARD_WIFI }}
          <v-icon>
            {{ house.wifi ? "done" : "close" }}
          </v-icon>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="primary"
        @click="goTo(house.id)"
        data-lang-key="APP_DETAILS"
      >
        {{ i18n.APP_DETAILS }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="addToWishList(house)">
        <v-icon :color="heartColor">mdi-heart</v-icon>
      </v-btn>
      <ShareLink :id="house.id" subFolder="house" />
    </v-card-actions>
  </v-card>
</template>

<script>
import ShareLink from "@/components/shared/ShareLink.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { find, isEmpty } from "lodash";
import placeholder from "@/assets/img/placeholder.png";

export default {
  name: "HouseOverviewCard",
  props: {
    house: Object
  },
  components: {
    ShareLink
  },
  computed: {
    ...mapState(["wishlist"]),
    ...mapGetters(["i18n"]),
    heartColor() {
      const isOnList = find(this.wishlist.wishlist, {
        id: this.house.id
      });
      return !isEmpty(isOnList) ? "accent" : "";
    },
    placeholderImg() {
      return placeholder;
    }
  },
  methods: {
    ...mapActions(["addToWishList"]),
    goTo(id) {
      this.$router.push({
        name: "HouseDetailPage",
        params: { id }
      });
    }
  }
};
</script>
