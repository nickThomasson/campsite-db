<template>
  <v-card class="mb-4">
    <v-card-text>
      <v-row no-gutters class="mb-3">
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>meeting_room</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          data-lang-key="HOUSE_DETAIL_PAGE_ROOMS"
          class="body-1"
          >{{ i18n.HOUSE_DETAIL_PAGE_ROOMS }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto body-1">
          {{ page.rooms }}
        </v-col>
      </v-row>

      <v-row no-gutters class="mb-3">
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>weekend</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          data-lang-key="CAMPSITE_DETAIL_CAPACITY"
          class="body-1"
          >{{ i18n.CAMPSITE_DETAIL_CAPACITY }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto body-1">
          {{ page.beds }} {{ i18n.HOUSE_DETAIL_PAGE_BEDS }}
        </v-col>
      </v-row>

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
          data-lang-key="HOUSE_DETAIL_PAGE_KITCHEN"
        >
          {{ i18n.HOUSE_DETAIL_PAGE_KITCHEN }}
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
          data-lang-key="HOUSE_DETAIL_PAGE_SANITARY"
          class="body-1"
          >{{ i18n.HOUSE_DETAIL_PAGE_SANITARY }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>{{ page.sanitary ? "done" : "close" }}</v-icon>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        class="mb-3"
        :aria-label="
          page.wifi ? i18n.HOUSE_DETAIL_HAS_WIFI : i18n.HOUSE_DETAIL_HAS_NO_WIFI
        "
      >
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>wifi</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          data-lang-key="HOUSE_DETAIL_PAGE_WIFI"
          class="body-1"
          >{{ i18n.HOUSE_DETAIL_PAGE_WIFI }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>{{ page.wifi ? "done" : "close" }}</v-icon>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        class="mb-3"
        :aria-label="
          page.wifi
            ? i18n.HOUSE_DETAIL_HAS_RECREATIONAL
            : i18n.HOUSE_DETAIL_HAS_NO_RECREATIONAL
        "
      >
        <v-col class="mr-2" cols="auto" align-self="center">
          <v-icon>videogame_asset</v-icon>
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
          data-lang-key="HOUSE_FILTER_LABEL_RECREATIONAL"
          class="body-1"
          >{{ i18n.HOUSE_FILTER_LABEL_RECREATIONAL }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon>{{ page.recreationalRoom ? "done" : "close" }}</v-icon>
        </v-col>
      </v-row>

      <v-row no-gutters class="mb-3" v-if="page.additionalEquipment.length > 0">
        <cols cols="12" md="5" class="mb-1 mb-md-0">
          <v-row no-gutters>
            <v-col class="mr-2" cols="auto" align-self="center">
              <v-icon>ballot</v-icon>
            </v-col>
            <v-col
              cols="auto"
              align-self="center"
              data-lang-key="HOUSE_DETAIL_PAGE_ADDITIONAL"
              class="body-1"
              >{{ i18n.HOUSE_DETAIL_PAGE_ADDITIONAL }}
            </v-col>
          </v-row>
        </cols>
        <v-spacer></v-spacer>
        <v-col cols="12" md="5" class="text-md-right pl-8 pl-md-0">
          {{ additional }}
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
          data-lang-key="HOUSE_DETAIL_PAGE_PRICE"
          >{{ i18n.HOUSE_DETAIL_PAGE_PRICE }}
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
    },
    additional() {
      const additionalEquipment = [];

      for (const item of this.page.additionalEquipment) {
        additionalEquipment.push(item.Item);
      }

      return additionalEquipment.join(", ");
    }
  },
  methods: {
    price(number) {
      return transformCurrency(number);
    }
  }
};
</script>
