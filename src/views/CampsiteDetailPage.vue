<template>
  <v-app>
    <Header />
    <v-progress-linear
      indeterminate
      color="accent"
      v-if="app.loadingStatus === status.Loading"
    ></v-progress-linear>
    <NotFound v-if="!detailPage.page" />
    <v-container v-if="app.loadingStatus === status.Ready && mergedPageData">
      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn color="primary" dense @click="goBack">{{
            i18n.CAMPSITE_APP_BACK
          }}</v-btn>
        </v-col>
        <v-col cols="auto" align-self="center">
          <h1>{{ page.name }}</h1>
        </v-col>
        <v-col cols="auto" align-self="center">
          <v-rating
            v-model="page.bewertung"
            readonly
            color="yellow darken-3"
            background-color="grey darken-1"
          ></v-rating>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-if="galleryExists"
          cols="12"
          md="12"
          lg="7"
          class="d-none d-sm-flex"
        >
          <v-carousel cycle>
            <v-carousel-item
              v-for="(item, i) in gallery"
              :key="i"
              :src="item.full_url"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col :cols="12" :lg="galleryExists ? 5 : 12">
          <v-row no-gutters>
            <v-col cols="12" class="mb-4"
              ><h4>{{ i18n.CAMPSITE_DETAIL_INFO_TITLE }}</h4></v-col
            >
            <v-col cols="12">
              <v-card class="mb-4">
                <v-card-title>{{ i18n.CAMPSITE_DETAIL_ADDRESS }}</v-card-title>
                <v-card-text>
                  <v-row no-gutters>
                    <v-col cols="12"
                      >{{ address.strasse }} {{ address.hausnummer }}</v-col
                    >
                    <v-col cols="12"
                      >{{ address.plz }} {{ address.stadt }}</v-col
                    >
                    <v-col cols="12">{{ address.bundesland }}</v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card class="mb-4">
                <v-card-title>{{
                  i18n.CAMPSITE_DETAIL_INFO_DATA_TITLE
                }}</v-card-title>
                <v-card-text>
                  <v-row no-gutters>
                    <v-col cols="12"
                      >{{ i18n.CAMPSITE_DETAIL_HOUSE_PRICE }}
                      {{ price(page.preis) }}</v-col
                    >
                    <v-col cols="12"
                      >{{ i18n.CAMPSITE_DETAIL_INFO_KITCHEN }}
                      {{ page.kueche ? "Ja" : "Nein" }}</v-col
                    >
                    <v-col cols="12"
                      >{{ i18n.CAMPSITE_DETAIL_INFO_SANITARY }}
                      {{ page.sanitaeranlagen ? "Ja" : "Nein" }}</v-col
                    >
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col class="mb-4" v-if="houses">
              <h4>
                {{
                  houses.length > 1
                    ? i18n.CAMPSITE_DETAIL_INFO_HOUSES_TITLE
                    : i18n.CAMPSITE_DETAIL_INFO_HOUSE_TITLE
                }}
              </h4>
            </v-col>
            <HouseCard
              v-for="(house, index) in houses"
              :key="index"
              :house="house"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Status } from "@/helper/status";
import Header from "@/components/Header.vue";
import NotFound from "@/components/NotFound.vue";
import HouseCard from "@/components/HouseCard.vue";
import { transformCurrency } from "@/helper/currency";

export default {
  name: "CampsiteDetailPage",
  components: {
    Header,
    NotFound,
    HouseCard
  },
  computed: {
    ...mapState([
      "detailPage",
      "searchResults",
      "authentication",
      "i18n",
      "app"
    ]),
    ...mapGetters(["mergedPageData", "gallery"]),
    status() {
      return Status;
    },
    page() {
      return this.mergedPageData ? this.mergedPageData.campsite : undefined;
    },
    address() {
      return this.mergedPageData ? this.mergedPageData.address : undefined;
    },
    houses() {
      return this.mergedPageData ? this.mergedPageData.house : undefined;
    },
    campsiteId() {
      return this.$route.params.campsiteId;
    },
    galleryExists() {
      return this.gallery.length !== 0;
    }
  },
  methods: {
    ...mapActions([
      "fetchPageData",
      "authenticateClient",
      "changePageStatus",
      "initializeState"
    ]),
    goBack() {
      this.$router.push({
        name: "CampsiteSearch"
      });
    },
    price(number) {
      return transformCurrency(number);
    }
  },
  mounted() {
    this.initializeState();
    this.changePageStatus(Status.Init);
    this.authenticateClient().then(() => {
      this.fetchPageData({
        token: this.authentication.token,
        id: this.campsiteId
      });
    });
  }
};
</script>
