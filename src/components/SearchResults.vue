<template>
  <v-row v-if="mergedResults">
    <v-col
      xl="4"
      lg="4"
      md="6"
      sm="12"
      cols="12"
      v-for="(result, index) in mergedResults"
      :key="index"
      class="mb-4"
    >
      <CampsiteOverviewCard :result="result" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { transformCurrency } from "@/helper/currency";
import CampsiteOverviewCard from "@/components/CampsiteOverviewCard.vue";

export default {
  name: "SearchResults",
  components: {
    CampsiteOverviewCard
  },
  computed: {
    ...mapState(["searchResults"]),
    ...mapGetters(["mergedResults"])
  },
  methods: {
    price(number) {
      return transformCurrency(number);
    }
  }
};
</script>
