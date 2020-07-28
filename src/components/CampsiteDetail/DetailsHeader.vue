<template>
  <v-row>
    <v-col cols="12" class="text-right">
      <v-btn color="primary" dense @click="goBack">{{
        i18n.CAMPSITE_APP_BACK
      }}</v-btn>
    </v-col>
    <v-col cols="auto" align-self="center">
      <h1>{{ page.name }}</h1>
    </v-col>
    <v-col cols="auto" align-self="center">
      <v-rating
        v-model="page.bewertung"
        readonly
        color="yellow darken-3"
        background-color="grey darken-1"
      ></v-rating>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "DetailsHeader",
  computed: {
    ...mapGetters(["mergedPageData"]),
    ...mapState(["i18n"]),
    page() {
      return this.mergedPageData ? this.mergedPageData.campsite : undefined;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
