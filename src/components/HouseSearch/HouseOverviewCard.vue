<template>
  <v-card>
    <v-img
      class="white--text align-end"
      :src="house.previewImage ? placeholderImg : placeholderImg"
      height="200px"
      gradient="to top, rgba(1, 57, 109, 0.8), rgba(0, 0, 0, 0.1)"
      :alt="house.name"
    >
      <v-card-title>
        {{ house.name }}
      </v-card-title>
    </v-img>

    <v-card-subtitle>
      {{ primaryAddress.city }}, {{ primaryAddress.state }}
    </v-card-subtitle>
    <v-card-text>
      <v-row no-gutters class="mb-3">
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>weekend</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          class="body-1"
          data-lang-key="CAMPSITE_DETAIL_CAPACITY"
          >{{ i18n.CAMPSITE_DETAIL_CAPACITY }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="auto"
          class="body-1"
          data-lang-key="HOUSE_SEARCH_CARD_BEDS"
        >
          {{ house.beds }} {{ i18n.HOUSE_SEARCH_CARD_BEDS }}
        </v-col>
      </v-row>

      <v-row no-gutters class="mb-3">
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>meeting_room</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          class="body-1"
          data-lang-key="HOUSE_SEARCH_CARD_ROOMS"
          >{{ i18n.HOUSE_SEARCH_CARD_ROOMS }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="auto"
          class="body-1"
          data-lang-key="HOUSE_SEARCH_CARD_ROOMS"
        >
          {{ house.rooms ? house.rooms : i18n.HOUSE_NO_ROOMS }}
        </v-col>
      </v-row>

      <v-row
        no-gutters
        class="mb-3"
        :aria-label="
          house.wifi
            ? i18n.HOUSE_DETAIL_HAS_WIFI
            : i18n.HOUSE_DETAIL_HAS_NO_WIFI
        "
      >
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>wifi</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          data-lang-key="HOUSE_SEARCH_CARD_WIFI"
          class="body-1"
          >{{ i18n.HOUSE_SEARCH_CARD_WIFI }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>{{ house.wifi ? "done" : "close" }}</v-icon>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>stars</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          class="body-1"
          data-lang-key="CAMPSITE_DETAIL_RATING"
          >{{ i18n.CAMPSITE_DETAIL_RATING }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-rating
            dense
            v-model="house.rating"
            readonly
            color="yellow darken-3"
            background-color="grey darken-1"
          ></v-rating>
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
    primaryAddress() {
      return this.house.mainAddress;
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
