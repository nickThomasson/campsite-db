<template>
  <v-container>
    <DetailsHeader v-if="!noPage" />
    <v-row v-if="noPage">
      <NotFound />
    </v-row>
    <v-row v-if="!noPage">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" class="mb-4"
            ><h4>{{ i18n.CAMPSITE_DETAIL_INFO_HOUSE_TITLE }}</h4></v-col
          >
          <v-col cols="12" md="6">
            <DetailsAddress />
          </v-col>
          <v-col v-if="galleryExists" cols="12"
            ><h4>{{ i18n.CAMPSITE_DETAIL_GALLERY_TITLE }}</h4></v-col
          >
          <v-col cols="12">
            <DetailsGallery />
          </v-col>
          <v-col v-if="campsites.length > 0" class="mb-4" cols="12">
            <h4>
              {{
                campsites.length > 1
                  ? i18n.CAMPSITE_DETAIL_INFO_CAMPSITES_TITLE
                  : i18n.CAMPSITE_DETAIL_INFO_CAMPSITE_TITLE
              }}
            </h4>
          </v-col>
          <DetailsCampsiteCard
            v-for="(campsite, index) in campsites"
            :key="index"
            :campsite="campsite"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import NotFound from "@/components/NotFound.vue";
import DetailsHeader from "@/components/shared/details/DetailsHeader.vue";
import DetailsAddress from "@/components/shared/details/DetailsAddress.vue";
import DetailsGallery from "@/components/shared/details/DetailsGallery.vue";
import DetailsCampsiteCard from "@/components/HouseDetail/DetailsCampsiteCard.vue";
import { isEmpty } from "lodash";

export default {
  name: "HouseDetailPage",
  components: {
    NotFound,
    DetailsHeader,
    DetailsAddress,
    DetailsGallery,
    DetailsCampsiteCard
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
      return false;
    }
  },
  mounted() {
    this.savePage(this.housePage[0]);
    this.setActivePage(this.i18n.CAMPSITE_DETAIL_INFO_HOUSE_TITLE);
  },
  updated() {
    this.setActivePage(this.i18n.CAMPSITE_DETAIL_INFO_HOUSE_TITLE);
  },
  beforeDestroy() {
    this.savePage({});
  }
};
</script>
