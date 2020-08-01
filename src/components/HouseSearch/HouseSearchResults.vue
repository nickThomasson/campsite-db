<template>
  <v-row v-if="houses.length > 0">
    <v-col
      xl="4"
      lg="6"
      md="12"
      sm="12"
      cols="12"
      v-for="(house, index) in houses"
      :key="index"
      class="mb-4"
    >
      <HouseOverviewCard :house="house" />
    </v-col>
  </v-row>
  <NoResults v-else />
</template>

<script>
import { mapGetters } from "vuex";
import HouseOverviewCard from "@/components/HouseSearch/HouseOverviewCard.vue";
import NoResults from "@/components/NoResults.vue";

export default {
  name: "HouseSearchResults",
  components: {
    HouseOverviewCard,
    NoResults
  },
  computed: {
    ...mapGetters(["houses"])
  }
};
</script>
