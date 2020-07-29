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
      <DetailsHeader />
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" class="mb-4"
              ><h4>{{ i18n.CAMPSITE_DETAIL_INFO_TITLE }}</h4></v-col
            >
            <v-col cols="12" md="6">
              <DetailsAddress />
            </v-col>
            <v-col cols="12" md="6">
              <DetailsData />
            </v-col>
            <v-col v-if="galleryExists" cols="12"
              ><h4>{{ i18n.CAMPSITE_DETAIL_GALLERY_TITLE }}</h4></v-col
            >
            <v-col cols="12">
              <DetailsGallery />
            </v-col>
            <v-col class="mb-4" v-if="houses" cols="12">
              <h4>
                {{
                  houses.length > 1
                    ? i18n.CAMPSITE_DETAIL_INFO_HOUSES_TITLE
                    : i18n.CAMPSITE_DETAIL_INFO_HOUSE_TITLE
                }}
              </h4>
            </v-col>
            <DetailsHouseCard
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
import DetailsHouseCard from "@/components/CampsiteDetail/DetailsHouseCard.vue";
import DetailsGallery from "@/components/CampsiteDetail/DetailsGallery.vue";
import DetailsHeader from "@/components/CampsiteDetail/DetailsHeader.vue";
import DetailsAddress from "@/components/CampsiteDetail/DetailsAddress.vue";
import DetailsData from "@/components/CampsiteDetail/DetailsData.vue";

export default {
  name: "CampsiteDetailPage",
  components: {
    Header,
    NotFound,
    DetailsHouseCard,
    DetailsGallery,
    DetailsHeader,
    DetailsAddress,
    DetailsData
  },
  computed: {
    ...mapState(["detailPage", "authentication", "app"]),
    ...mapGetters(["mergedPageData", "gallery", "i18n"]),
    status() {
      return Status;
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
      "fetchTranslations"
    ])
  },
  created() {
    this.changePageStatus(Status.Init);
    this.authenticateClient().then(() => {
      this.fetchTranslations(this.authentication.token).then(() => {
        this.fetchPageData({
          token: this.authentication.token,
          id: this.campsiteId
        });
      });
    });
  }
};
</script>
