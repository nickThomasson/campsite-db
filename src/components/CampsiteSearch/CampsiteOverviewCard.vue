<template>
  <v-card>
    <v-img
      class="white--text align-end"
      :src="previewImage"
      height="200px"
      gradient="to top, rgba(1, 57, 109, 0.8), rgba(0, 0, 0, 0.1)"
      :alt="campsite.name"
    >
      <v-card-title>
        {{ campsite.name }}
      </v-card-title>
    </v-img>

    <v-card-subtitle>
      {{ primaryAddress.city }}, {{ primaryAddress.state }}
    </v-card-subtitle>
    <v-card-text>
      <v-row no-gutters class="mb-3">
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>people</v-icon>
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
          data-lang-key="CAMPSITE_DETAIL_PERSONS"
        >
          {{ campsite.persons }} {{ i18n.CAMPSITE_DETAIL_PERSONS }}
        </v-col>
      </v-row>

      <v-row
        no-gutters
        class="mb-3"
        :aria-label="
          campsite.kitchen
            ? i18n.CAMPSITE_DETAIL_HAS_KITCHEN
            : i18n.CAMPSITE_DETAIL_HAS_NO_KITCHEN
        "
      >
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>kitchen</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          class="body-1"
          data-lang-key="CAMPSITE_SEARCH_CARD_KITCHEN"
        >
          {{ i18n.CAMPSITE_SEARCH_CARD_KITCHEN }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>{{ campsite.kitchen ? "done" : "close" }}</v-icon>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        class="mb-3"
        :aria-label="
          campsite.sanitary
            ? i18n.CAMPSITE_DETAIL_HAS_SANITARY
            : i18n.CAMPSITE_DETAIL_HAS_NO_SANITARY
        "
      >
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>wc</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          data-lang-key="CAMPSITE_SEARCH_CARD_SANITARY"
          class="body-1"
          >{{ i18n.CAMPSITE_SEARCH_CARD_SANITARY }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>{{ campsite.sanitary ? "done" : "close" }}</v-icon>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        class="mb-3"
        :aria-label="
          campsite.house.length > 0
            ? i18n.CAMPSITE_DETAIL_HAS_HOUSE
            : i18n.CAMPSITE_DETAIL_HAS_NO_HOUSE
        "
      >
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>home</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          class="body-1"
          :data-lang-key="
            campsite.house.length > 1
              ? 'CAMPSITE_DETAIL_HOUSES'
              : 'CAMPSITE_DETAIL_HOUSE'
          "
          >{{
            campsite.house.length > 1
              ? i18n.CAMPSITE_DETAIL_HOUSES
              : i18n.CAMPSITE_DETAIL_HOUSE
          }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>{{ campsite.house.length > 0 ? "done" : "close" }}</v-icon>
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
            v-model="campsite.rating"
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
        @click="goTo(campsite.id)"
        data-lang-key="APP_DETAILS"
      >
        {{ i18n.APP_DETAILS }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="addToWishList(campsite)">
        <v-icon :color="heartColor">mdi-heart</v-icon>
      </v-btn>
      <ShareLink :id="campsite.id" subFolder="campsite" />
    </v-card-actions>
  </v-card>
</template>

<script>
import ShareLink from "@/components/shared/ShareLink.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { find, isEmpty } from "lodash";
import placeholder from "@/assets/img/placeholder.png";
import imageGenerator from "@/helper/imageGenerator";

export default {
  name: "CampsiteOverviewCard",
  props: {
    campsite: Object
  },
  components: {
    ShareLink
  },
  computed: {
    ...mapState(["wishlist"]),
    ...mapGetters(["i18n"]),
    heartColor() {
      const isOnList = find(this.wishlist.wishlist, {
        id: this.campsite.id
      });
      return !isEmpty(isOnList) ? "accent" : "";
    },
    placeholderImg() {
      return placeholder;
    },
    previewImage() {
      const img = this.campsite.previewImage.id;
      if (!img) return this.placeholderImg;
      return imageGenerator(img, "img-small");
    },
    primaryAddress() {
      return this.campsite.mainAddress;
    }
  },
  methods: {
    ...mapActions(["addToWishList"]),
    goTo(id) {
      this.$router.push({
        name: "CampsiteDetailPage",
        params: { id }
      });
    }
  }
};
</script>
