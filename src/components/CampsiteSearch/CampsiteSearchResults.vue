<template>
  <v-row v-if="campsites.length > 0">
    <v-col
      xl="3"
      lg="4"
      md="6"
      sm="12"
      cols="12"
      v-for="(campsite, index) in campsites"
      :key="index"
      class="mb-4"
    >
      <CampsiteOverviewCard :campsite="campsite" />
    </v-col>
  </v-row>
  <NoResults v-else />
</template>

<script>
import { mapGetters } from "vuex";
import CampsiteOverviewCard from "@/components/CampsiteSearch/CampsiteOverviewCard.vue";
import NoResults from "@/components/NoResults.vue";

export default {
  name: "CampsiteSearchResults",
  components: {
    CampsiteOverviewCard,
    NoResults
  },
  computed: {
    ...mapGetters(["campsites"])
  }
};
</script>
