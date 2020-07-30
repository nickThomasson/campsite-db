<template>
  <v-row v-if="campsites">
    <v-col
      xl="4"
      lg="6"
      md="12"
      sm="12"
      cols="12"
      v-for="(campsite, index) in campsites"
      :key="index"
      class="mb-4"
    >
      <CampsiteOverviewCard :campsite="campsite" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import CampsiteOverviewCard from "@/components/CampsiteSearch/CampsiteOverviewCard.vue";

export default {
  name: "SearchResults",
  components: {
    CampsiteOverviewCard
  },
  computed: {
    ...mapGetters(["campsites"])
  }
};
</script>
