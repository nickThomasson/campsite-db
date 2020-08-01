<template>
  <v-container>
    <DetailsHeader v-if="!noPage" />
    <v-row v-if="noPage">
      <NotFound />
    </v-row>
    <v-row v-if="!noPage">
      <v-col cols="12">
        <v-row>
          <v-col
            cols="12"
            class="mb-4"
            data-lang-key="CAMPSITE_DETAIL_INFO_TITLE"
            ><h4>{{ i18n.CAMPSITE_DETAIL_INFO_TITLE }}</h4></v-col
          >
          <v-col cols="12" md="6">
            <DetailsAddress />
          </v-col>
          <v-col cols="12" md="6">
            <DetailsData />
          </v-col>
          <v-col
            v-if="galleryExists"
            cols="12"
            data-lang-key="CAMPSITE_DETAIL_GALLERY_TITLE"
            ><h4>{{ i18n.CAMPSITE_DETAIL_GALLERY_TITLE }}</h4></v-col
          >
          <v-col cols="12">
            <DetailsGallery />
          </v-col>
          <v-col v-if="houses.length > 0" class="mb-4" cols="12">
            <h4
              :data-lang-key="
                houses.length > 1
                  ? 'CAMPSITE_DETAIL_INFO_HOUSES_TITLE'
                  : 'CAMPSITE_DETAIL_INFO_HOUSE_TITLE'
              "
            >
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
import DetailsGallery from "@/components/shared/details/DetailsGallery.vue";
import DetailsHeader from "@/components/shared/details/DetailsHeader.vue";
import DetailsAddress from "@/components/shared/details/DetailsAddress.vue";
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
    ...mapActions(["setActivePage", "savePage"])
  },
  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n", "campsites"]),
    noPage() {
      return isEmpty(this.detailPage.page);
    },
    status() {
      return Status;
    },
    houses() {
      if (!this.noPage && this.detailPage.page.house) {
        return this.detailPage.page.house;
      }
      return false;
    },
    campsiteId() {
      return this.$route.params.id;
    },
    galleryExists() {
      if (!this.noPage && this.detailPage.page.gallery) {
        return this.detailPage.page.gallery.length !== 0;
      }
      return false;
    },
    campsitePage() {
      const campsitePage = this.campsites.filter(
        item => item.id === parseInt(this.campsiteId)
      );
      return campsitePage;
    }
  },
  mounted() {
    this.savePage(this.campsitePage[0]);
    this.setActivePage(this.i18n.CAMPSITE_DETAIL_INFO_TITLE);
  },
  updated() {
    this.setActivePage(this.i18n.CAMPSITE_DETAIL_INFO_TITLE);
  },
  beforeDestroy() {
    this.savePage({});
  }
};
</script>
