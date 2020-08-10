<template>
  <v-card class="mb-4">
    <v-card-text>
      <v-row
        no-gutters
        class="mb-3"
        :aria-label="
          page.kitchen
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
          data-lang-key="CAMPSITE_DETAIL_PAGE_KITCHEN"
        >
          {{ i18n.CAMPSITE_DETAIL_PAGE_KITCHEN }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>{{ page.kitchen ? "done" : "close" }}</v-icon>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        class="mb-3"
        :aria-label="
          page.sanitary
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
          data-lang-key="CAMPSITE_DETAIL_PAGE_SANITARY"
          class="body-1"
          >{{ i18n.CAMPSITE_DETAIL_PAGE_SANITARY }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>{{ page.sanitary ? "done" : "close" }}</v-icon>
        </v-col>
      </v-row>

      <v-row
        v-if="page.house"
        no-gutters
        class="mb-3"
        :aria-label="
          page.house.length > 0
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
            page.house.length > 1
              ? 'CAMPSITE_DETAIL_HOUSES'
              : 'CAMPSITE_DETAIL_HOUSE'
          "
          >{{
            page.house.length > 1
              ? i18n.CAMPSITE_DETAIL_HOUSES
              : i18n.CAMPSITE_DETAIL_HOUSE
          }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>{{ page.house.length > 0 ? "done" : "close" }}</v-icon>
        </v-col>
      </v-row>

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
          {{ page.persons }} {{ i18n.CAMPSITE_DETAIL_PERSONS }}
        </v-col>
      </v-row>

      <v-row no-gutters class="mb-3">
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
            v-model="page.rating"
            readonly
            color="yellow darken-3"
            background-color="grey darken-1"
          ></v-rating>
        </v-col>
      </v-row>

      <v-row no-gutters class="mb-3">
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>euro</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          class="body-1"
          data-lang-key="CAMPSITE_DETAIL_PAGE_PRICE"
          >{{ i18n.CAMPSITE_DETAIL_PAGE_PRICE }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="body-1">{{ price(page.price) + " *" }}</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" class="text-right">
          <span class="caption text--disabled">
            {{ "* " + i18n.CAMPSITE_DETAIL_PRICE_CATEGORY }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { transformCurrency } from "@/helper/currency";

export default {
  name: "DetailsData",

  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n"]),
    page() {
      return this.detailPage.page;
    }
  },
  methods: {
    price(number) {
      return transformCurrency(number);
    }
  }
};
</script>
