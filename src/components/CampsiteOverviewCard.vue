<template>
  <v-card>
    <v-img
      class="white--text align-end"
      :src="result.campsite.vorschaubild.data.thumbnails[2].url"
      height="200px"
      gradient="to top, rgba(1, 57, 109, 0.8), rgba(0, 0, 0, 0.1)"
    >
      <v-card-title>{{ result.campsite.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ result.address.stadt }},
      {{ result.address.bundesland }}
    </v-card-subtitle>
    <v-card-text>
      <v-rating
        v-model="result.campsite.bewertung"
        readonly
        color="yellow darken-3"
        background-color="grey darken-1"
      ></v-rating>
      <v-row>
        <v-col cols="6">
          <v-row no-gutters>
            <v-col>
              <ul>
                <li>Personen: {{ result.campsite.personen }}</li>
                <li>
                  Küche:
                  <v-icon>{{
                    result.campsite.kueche ? "done" : "close"
                  }}</v-icon>
                </li>
                <li>
                  Sanitäranlagen:
                  <v-icon>
                    {{ result.campsite.sanitaeranlagen ? "done" : "close" }}
                  </v-icon>
                </li>
                <li>Preis: {{ price(result.campsite.preis) }}</li>
              </ul>
            </v-col>
          </v-row>
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
import ShareLink from "@/components/ShareLink.vue";
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
    ...mapState(["wishlist"]),
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
