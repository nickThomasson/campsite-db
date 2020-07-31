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
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import NotFound from "@/components/NotFound.vue";
import DetailsHeader from "@/components/HouseDetail/DetailsHeader.vue";
import DetailsAddress from "@/components/HouseDetail/DetailsAddress.vue";
import { isEmpty } from "lodash";

export default {
  name: "HouseDetailPage",
  components: {
    NotFound,
    DetailsHeader,
    DetailsAddress
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
    housePage() {
      const housePage = this.houses.filter(
        item => item.id === parseInt(this.houseId)
      );
      return housePage;
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
