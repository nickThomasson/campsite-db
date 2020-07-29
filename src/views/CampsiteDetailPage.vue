<template>
  <v-container v-if="loading">
    <NotFound v-if="!detailPage.page" />
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
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Status } from "@/helper/status";
import NotFound from "@/components/NotFound.vue";
import DetailsHouseCard from "@/components/CampsiteDetail/DetailsHouseCard.vue";
import DetailsGallery from "@/components/CampsiteDetail/DetailsGallery.vue";
import DetailsHeader from "@/components/CampsiteDetail/DetailsHeader.vue";
import DetailsAddress from "@/components/CampsiteDetail/DetailsAddress.vue";
import DetailsData from "@/components/CampsiteDetail/DetailsData.vue";
import { isEmpty } from "lodash";

export default {
  name: "CampsiteDetailPage",
  components: {
    NotFound,
    DetailsHouseCard,
    DetailsGallery,
    DetailsHeader,
    DetailsAddress,
    DetailsData
  },
  methods: {
    ...mapActions(["setActivePage"])
  },
  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["mergedPageData", "gallery", "i18n"]),
    loading() {
      return (
        this.detailPage.pageStatus === Status.Ready &&
        !isEmpty(this.mergedPageData)
      );
    },
    status() {
      return Status;
    },
    houses() {
      return this.mergedPageData.house;
    },
    campsiteId() {
      return this.$route.params.campsiteId;
    },
    galleryExists() {
      return this.gallery.length !== 0;
    }
  },
  mounted() {
    this.setActivePage(this.i18n.CAMPSITE_DETAIL_INFO_TITLE);
  },
  updated() {
    this.setActivePage(this.i18n.CAMPSITE_DETAIL_INFO_TITLE);
  }
};
</script>
