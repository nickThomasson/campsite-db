<template>
  <v-container>
    <DetailsHeader v-if="!noPage" />
    <v-row v-if="noPage">
      <NotFound />
    </v-row>
    <v-row v-if="!noPage">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="6">
            <DetailsData />
            <DetailsCampsites :campsites="campsites" />
            <DetailsAnnotations />
          </v-col>
          <v-col cols="12" md="6">
            <DetailsAddress />
          </v-col>
          <v-col cols="12">
            <DetailsGallery />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import NotFound from "@/components/NotFound.vue";
import DetailsHeader from "@/components/HouseDetail/DetailsHeader.vue";
import DetailsAddress from "@/components/shared/details/DetailsAddress.vue";
import DetailsGallery from "@/components/shared/details/DetailsGallery.vue";
import DetailsData from "@/components/HouseDetail/DetailsData.vue";
import DetailsCampsites from "@/components/HouseDetail/DetailsCampsites.vue";
import DetailsAnnotations from "@/components/HouseDetail/DetailsAnnotations.vue";
import { isEmpty } from "lodash";

export default {
  name: "HouseDetailPage",
  components: {
    NotFound,
    DetailsHeader,
    DetailsAddress,
    DetailsGallery,
    DetailsData,
    DetailsCampsites,
    DetailsAnnotations
  },
  methods: {
    ...mapActions(["setActivePage", "savePage"])
  },
  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n", "houses"]),
    noPage() {
      return isEmpty(this.detailPage.page);
    },
    houseId() {
      return this.$route.params.id;
    },
    galleryExists() {
      if (!this.noPage && this.detailPage.page.gallery) {
        return this.detailPage.page.gallery.length !== 0;
      }
      return false;
    },
    housePage() {
      const housePage = this.houses.filter(
        item => item.id === parseInt(this.houseId)
      );
      return housePage;
    },
    campsites() {
      if (!this.noPage && this.detailPage.page.campsites) {
        return this.detailPage.page.campsites;
      }
      return [];
    }
  },
  mounted() {
    this.savePage(this.housePage[0]);
    this.setActivePage(this.i18n.HOUSE_DETAIL_HOUSE_TITLE);
  },
  updated() {
    this.setActivePage(this.i18n.HOUSE_DETAIL_HOUSE_TITLE);
  },
  beforeDestroy() {
    this.savePage({});
  }
};
</script>
